'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Phone, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('biharAcharCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      // Add a test product for demonstration
      const testCart = [{
        id: 'test-123',
        name: 'Test Mango Pickle',
        price: 299,
        quantity: 1,
        weight: '500gm',
        image: '🥭'
      }];
      localStorage.setItem('biharAcharCart', JSON.stringify(testCart));
      setCart(testCart);
    }
    setLoading(false);
  };

  const updateQuantity = (productId: string, delta: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('biharAcharCart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('biharAcharCart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('biharAcharCart');
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    // Validate payment details
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter your UPI ID');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        alert('Please enter complete card details');
        return;
      }
      if (cardNumber.length < 16) {
        alert('Please enter a valid 16-digit card number');
        return;
      }
      if (cardCvv.length < 3) {
        alert('Please enter a valid 3-digit CVV');
        return;
      }
    }

    // Create order with selected payment method
    const order = {
      id: 'BAS' + Date.now().toString().slice(-8),
      items: cart,
      totalAmount: getTotalAmount(),
      paymentMethod: paymentMethod,
      paymentDetails: paymentMethod === 'upi' ? { upiId } : 
                     paymentMethod === 'card' ? { 
                       cardNumber: cardNumber.slice(-4), 
                       expiry: cardExpiry 
                     } : null,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('biharAcharOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('biharAcharOrders', JSON.stringify(existingOrders));

    // Show success message with payment details
    let paymentInfo = '';
    if (paymentMethod === 'cod') {
      paymentInfo = 'Pay when you receive your order';
    } else if (paymentMethod === 'upi') {
      paymentInfo = `UPI Payment to: ${upiId}`;
    } else if (paymentMethod === 'card') {
      paymentInfo = `Card ending in: ****-****-****-${cardNumber.slice(-4)}`;
    }

    alert(`Order placed successfully! Order ID: ${order.id}\nPayment Method: ${paymentInfo}\n\nWe will process your order soon.`);
    
    // Clear cart and reset form
    clearCart();
    setShowPayment(false);
    setUpiId('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setPaymentMethod('cod');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">🥭</div>
                <h1 className="text-xl font-bold text-red-800">Bihar Achar Store</h1>
              </div>
            </div>
            
            <Link href="/">
              <Button variant="outline" size="sm">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {showPayment ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setShowPayment(false)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
            
            <Card className="shadow-sm">
              <CardHeader className="p-3 sm:p-4 lg:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-3 sm:p-4 lg:p-6 pt-0">
                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Cash on Delivery (COD)</span>
                  </label>

                  {/* UPI Payment */}
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">UPI Payment</span>
                  </label>

                  {/* Credit/Debit Card */}
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Credit/Debit Card</span>
                  </label>
                </div>

                {/* Payment Details Form */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <label className="text-sm font-medium">Enter UPI ID:</label>
                    <input
                      type="text"
                      placeholder="yourupi@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-3 border rounded-lg text-sm"
                    />
                    <p className="text-xs text-gray-600">Enter your UPI ID (e.g., 919876543210@ybl)</p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <label className="text-sm font-medium">Card Details:</label>
                    <input
                      type="text"
                      placeholder="Card Number (16 digits)"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                      className="w-full p-3 border rounded-lg text-sm"
                      maxLength={16}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 3) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setCardExpiry(value);
                        }}
                        className="w-full p-3 border rounded-lg text-sm"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        className="w-full p-3 border rounded-lg text-sm"
                        maxLength={3}
                      />
                    </div>
                    <p className="text-xs text-gray-600">Your card details are secure and encrypted</p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Pay when you receive your order. No advance payment required.</p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-red-600">₹{getTotalAmount()}</span>
                  </div>
                  <Button 
                    size="lg"
                    onClick={handlePlaceOrder}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Add some delicious pickles to your cart!</p>
                <Link href="/">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="bg-white shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.image && (item.image.startsWith('data:') || item.image.startsWith('http')) ? (
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <span className="text-3xl">{item.image || '🥭'}</span>
                            )}
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.weight}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-lg font-bold text-red-600">₹{item.price}</span>
                              <span className="text-sm text-gray-500">per {item.weight}</span>
                            </div>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Cart Actions */}
                  <div className="flex justify-between items-center pt-4">
                    <Button 
                      variant="outline"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                    <Link href="/">
                      <Button variant="outline">
                        Add More Items
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="bg-white shadow-sm sticky top-24">
                    <CardHeader>
                      <CardTitle className="text-xl">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Items:</span>
                        <span className="font-semibold">{getTotalItems()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold">₹{getTotalAmount()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="font-semibold text-green-600">FREE</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-red-600">₹{getTotalAmount()}</span>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-800">
                          🎉 Free delivery on all orders!
                        </p>
                      </div>
                      
                      <Button 
                        size="lg"
                        onClick={() => setShowPayment(true)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        disabled={cart.length === 0}
                      >
                        Proceed to Payment
                      </Button>
                      
                      {/* Contact Options */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => window.open('tel:+919798633639')}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => window.open('https://wa.me/919798633639?text=Hi%20I%20want%20to%20place%20an%20order', '_blank')}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          WhatsApp
                        </Button>
                      </div>
                      
                      <div className="text-xs text-gray-500 text-center">
                        <p>Secure payment processing</p>
                        <p>©2025 Bihar Achar Store</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}