import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderId, customerName, customerEmail, customerPhone } = body;

    // Validate input
    if (!amount || !orderId || !customerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate transaction ID
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // In a real implementation, you would integrate with PhonePe API here
    // For now, we'll simulate the QR code generation
    const merchantId = 'MERCHANT123456';
    const upiId = 'rahulraj@ybl'; // From the image
    
    // Create UPI payment string
    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(customerName)}&am=${amount}&cu=INR&tid=${transactionId}&tn=${encodeURIComponent(`Order ${orderId}`)}`;
    
    // Generate QR code (in real implementation, use PhonePe SDK or QR code library)
    // For demo purposes, we'll create a simple QR code using an online service
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiString)}`;

    // Store transaction details (in real app, save to database)
    const transaction = {
      id: transactionId,
      orderId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      upiId,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    // Save transaction to database (you would implement this)
    // await db.transaction.create({ data: transaction });

    return NextResponse.json({
      success: true,
      transactionId,
      qrCode: qrCodeUrl,
      upiString,
      merchantId,
      upiId,
    });

  } catch (error) {
    console.error('Error generating PhonePe QR:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}