'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('biharAcharCart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      if (cartData.length === 0) {
        // Add a test product for debugging
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
      } else {
        setCart(cartData);
      }
    } else {
      // Add a test product for debugging
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
  }, [router]);

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.phone.length !== 10) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (formData.pincode.length !== 6) newErrors.pincode = 'Pincode must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const generateOrderId = () => {
    return 'BAS' + Date.now().toString().slice(-8);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Generate order ID
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);

      // Create order object
      const order = {
        id: newOrderId,
        customerInfo: formData,
        items: cart,
        totalAmount: getTotalAmount(),
        paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Save order to localStorage for demo
      const existingOrders = JSON.parse(localStorage.getItem('biharAcharOrders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('biharAcharOrders', JSON.stringify(existingOrders));

      // Clear cart
      localStorage.removeItem('biharAcharCart');
      setCart([]);

      // Show success message
      setOrderPlaced(true);

    } catch (error) {
      console.error('Error placing order:', error);
      setErrors(prev => ({ ...prev, submit: 'Failed to place order. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-3 sm:mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Thank you for your order</p>
            
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-gray-600">Order ID</p>
              <p className="text-base sm:text-lg font-semibold">{orderId}</p>
            </div>
            
            <div className="space-y-2 text-left bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-blue-800"><strong>Next Steps:</strong></p>
              <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                <li>• We'll verify your payment within 24 hours</li>
                <li>• You'll receive order confirmation via WhatsApp</li>
                <li>• Your order will be shipped within 2-3 days</li>
                <li>• Expected delivery: 5-7 days</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <Link href="/">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3">
                  Continue Shopping
                </Button>
              </Link>
              <Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-3">
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Compact Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/cart" className="text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">B</span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Checkout</h1>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
              {getTotalItems()} items
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {/* Customer Information */}
            <Card className="shadow-sm">
              <CardHeader className="p-3 sm:p-4 lg:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4 lg:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="name" className="text-xs sm:text-sm font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`text-xs sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email (Optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="text-xs sm:text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-xs sm:text-sm font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={10}
                    className={`text-xs sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <Label htmlFor="address" className="text-xs sm:text-sm font-medium">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    className={`text-xs sm:text-sm ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Street address, area, landmark"
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="city" className="text-xs sm:text-sm font-medium">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`text-xs sm:text-sm ${errors.city ? 'border-red-500' : ''}`}
                      placeholder="City"
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-xs sm:text-sm font-medium">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`text-xs sm:text-sm ${errors.state ? 'border-red-500' : ''}`}
                      placeholder="State"
                    />
                    {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-xs sm:text-sm font-medium">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      maxLength={6}
                      className={`text-xs sm:text-sm ${errors.pincode ? 'border-red-500' : ''}`}
                      placeholder="6-digit"
                    />
                    {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes" className="text-xs sm:text-sm font-medium">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Any special instructions..."
                    className="text-xs sm:text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
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
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-3 sm:space-y-4">
              <Card className="shadow-sm">
                <CardHeader className="p-3 sm:p-4 lg:p-6 pb-2 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                  <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {(() => {
                            // Try multiple image sources in priority order
                            const finalImage = item.image || item.imageUrl || item.images?.[0] || item.image || '🥭';
                            
                            // If it's an emoji or single character, display it as text
                            if (finalImage && finalImage.length <= 2 && !finalImage.startsWith('http') && !finalImage.startsWith('data:')) {
                              return <span className="text-2xl sm:text-3xl">{finalImage}</span>;
                            }
                            
                            // If it's a URL, display as image
                            if (finalImage && (finalImage.startsWith('http') || finalImage.startsWith('data:'))) {
                              return (
                                <img 
                                  src={finalImage} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover rounded-lg"
                                  onError={(e) => {
                                    // Fallback to emoji if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement.innerHTML = '<span class="text-2xl sm:text-3xl">🥭</span>';
                                  }}
                                />
                              );
                            }
                            
                            // Default fallback
                            return <span className="text-2xl sm:text-3xl">🥭</span>;
                          })()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.weight} × {item.quantity}</p>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-3 sm:my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base font-semibold">Total</span>
                      <span className="text-base sm:text-lg font-bold text-orange-600">₹{getTotalAmount()}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm py-2 sm:py-3 mt-4"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </Button>

                  {errors.submit && (
                    <Alert className="mt-3">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription className="text-xs">{errors.submit}</AlertDescription>
                    </Alert>
                  )}

                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-800">Secure Checkout</span>
                    </div>
                    <p className="text-xs text-green-700">Your payment information is encrypted and secure</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}