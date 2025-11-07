'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { QrCode, Smartphone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PhonePePaymentProps {
  amount: number;
  orderId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess?: (transactionId: string) => void;
  onFailure?: (error: string) => void;
  onClose?: () => void;
}

export default function PhonePePayment({
  amount,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure,
  onClose
}: PhonePePaymentProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [qrCode, setQrCode] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const generateQRCode = async () => {
    setIsLoading(true);
    setPaymentStatus('processing');
    
    try {
      // Generate PhonePe payment QR code
      const response = await fetch('/api/payment/phonepe/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          orderId,
          customerName,
          customerEmail,
          customerPhone,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setQrCode(data.qrCode);
        setTransactionId(data.transactionId);
        
        // Start polling for payment status
        pollPaymentStatus(data.transactionId);
      } else {
        setPaymentStatus('failed');
        onFailure?.(data.error || 'Failed to generate QR code');
      }
    } catch (error) {
      setPaymentStatus('failed');
      onFailure?.('Payment initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  const pollPaymentStatus = async (txnId: string) => {
    const maxAttempts = 60; // Poll for 5 minutes (every 5 seconds)
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setPaymentStatus('failed');
        onFailure?.('Payment timeout');
        return;
      }

      try {
        const response = await fetch(`/api/payment/phonepe/status?transactionId=${txnId}`);
        const data = await response.json();

        if (data.success) {
          if (data.status === 'SUCCESS') {
            setPaymentStatus('success');
            onSuccess?.(txnId);
          } else if (data.status === 'FAILED') {
            setPaymentStatus('failed');
            onFailure?.(data.error || 'Payment failed');
          } else {
            // Still pending, continue polling
            attempts++;
            setTimeout(poll, 5000);
          }
        } else {
          setPaymentStatus('failed');
          onFailure?.('Failed to check payment status');
        }
      } catch (error) {
        setPaymentStatus('failed');
        onFailure?.('Error checking payment status');
      }
    };

    poll();
  };

  const handlePayment = () => {
    if (paymentStatus === 'pending') {
      generateQRCode();
    }
  };

  const resetPayment = () => {
    setPaymentStatus('pending');
    setQrCode('');
    setTransactionId('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">PhonePe Payment</CardTitle>
        <p className="text-gray-600">Scan QR code using PhonePe App</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Order Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Order ID:</span>
            <span className="text-sm font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Customer:</span>
            <span className="text-sm font-medium">{customerName}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Amount:</span>
            <span className="text-2xl font-bold text-green-600">₹{amount}</span>
          </div>
        </div>

        {/* Payment Status */}
        <div className="text-center">
          {paymentStatus === 'pending' && (
            <div className="space-y-4">
              <p className="text-gray-600">Click below to generate QR code</p>
              <Button 
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating QR...
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </>
                )}
              </Button>
            </div>
          )}

          {paymentStatus === 'processing' && (
            <div className="space-y-4">
              <div className="bg-black p-4 rounded-lg flex items-center justify-center">
                {qrCode ? (
                  <img 
                    src={qrCode} 
                    alt="PhonePe QR Code" 
                    className="w-48 h-48 bg-white p-2 rounded"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Scan this QR code with PhonePe App</p>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Transaction ID: {transactionId}
                </Badge>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Waiting for payment...</span>
              </div>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-green-600">Payment Successful!</h3>
                <p className="text-gray-600">Your payment has been processed successfully</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Transaction ID: {transactionId}
                </Badge>
              </div>
              <Button 
                onClick={onClose}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Continue
              </Button>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <AlertCircle className="w-16 h-16 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-red-600">Payment Failed</h3>
                <p className="text-gray-600">Please try again or contact support</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={resetPayment}
                  variant="outline"
                  className="w-full"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* PhonePe Instructions */}
        {paymentStatus === 'processing' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">How to pay:</h4>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Open PhonePe App on your phone</li>
              <li>2. Tap on 'Scan QR' icon</li>
              <li>3. Scan the QR code above</li>
              <li>4. Enter amount and confirm payment</li>
            </ol>
          </div>
        )}

        {/* Security Badge */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <CheckCircle className="w-3 h-3" />
            <span>Secured by PhonePe</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">©2025, All rights reserved, PhonePe Internet Pvt. Ltd.</p>
        </div>
      </CardContent>
    </Card>
  );
}