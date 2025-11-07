'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, ShoppingCart, Plus, Minus, Truck, Shield, ChefHat, ArrowLeft, Phone, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useEffect(() => {
    loadProduct();
    loadCart();
  }, [productId]);

  const loadCart = () => {
    const savedCart = localStorage.getItem('biharAcharCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const loadProduct = async () => {
    try {
      // First try to get from API (database)
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const foundProduct = data.data.find((p: any) => p.id === productId);
          if (foundProduct) {
            // Transform product data
            const transformedProduct = {
              ...foundProduct,
              images: foundProduct.images ? (typeof foundProduct.images === 'string' ? JSON.parse(foundProduct.images) : foundProduct.images) : [],
              image: foundProduct.images ? (typeof foundProduct.images === 'string' ? JSON.parse(foundProduct.images)[0] : foundProduct.images[0]) : foundProduct.imageUrl || '🥭',
              rating: foundProduct.rating || 4.5,
              reviews: foundProduct.reviews || [],
            };
            setProduct(transformedProduct);
            setLoading(false);
            return;
          }
        }
      }
    } catch (error) {
      console.error('Error loading product from API:', error);
    }

    // Fallback to localStorage
    const savedProducts = localStorage.getItem('biharAcharProducts');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const foundProduct = products.find((p: any) => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
        return;
      }
    }

    // Default product if not found
    const defaultProduct = {
      id: productId,
      name: 'Traditional Lemon Pickle',
      description: 'dfbdfsds',
      price: 299,
      weight: '500gm',
      image: '🍋',
      images: ['🍋'],
      rating: 4.5,
      reviews: 0,
      stock: 80,
      sku: 'SKU - 1761712532108',
      category: 'Lemon Pickle',
      status: 'active'
    };
    setProduct(defaultProduct);
    setLoading(false);
  };

  const addToCart = () => {
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);
    const productWithImage = {
      ...product,
      image: product.images?.[0] || product.image || product.imageUrl || '🥭'
    };
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { ...productWithImage, quantity }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('biharAcharCart', JSON.stringify(updatedCart));
    
    // Navigate to cart
    router.push('/cart');
  };

  const buyNow = () => {
    if (!product) return;
    setShowPayment(true);
  };

  const handlePlaceOrder = () => {
    if (!product) return;

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
      items: [{ ...product, quantity }],
      totalAmount: product.price * quantity,
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

    alert(`Order placed successfully!\n\nOrder ID: ${order.id}\nProduct: ${product.name}\nQuantity: ${quantity}\nTotal: ₹${order.totalAmount}\nPayment: ${paymentInfo}\n\nWe will process your order soon.`);
    
    // Reset form
    setShowPayment(false);
    setUpiId('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setPaymentMethod('cod');
    router.push('/');
  };

  const updateQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const renderProductImage = (image: string, index: number) => {
    if (image.startsWith('data:') || image.startsWith('http')) {
      return (
        <img 
          src={image} 
          alt={`${product.name} ${index + 1}`}
          className="w-full h-96 object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Error'
          }}
        />
      );
    } else {
      return (
        <div className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg">
          <span className="text-9xl">{image}</span>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  // Get product images
  let productImages = product.images || [];
  const singleImage = product.image || product.imageUrl;
  if (productImages.length === 0 && singleImage && singleImage !== '🥭') {
    productImages = [singleImage];
  }
  if (productImages.length === 0) {
    productImages = ['🥭'];
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
            
            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                </Button>
              </Link>
            </div>
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
              Back to Product
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
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Product:</span>
                    <span className="text-sm font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="text-sm font-medium">{quantity}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-red-600">₹{product.price * quantity}</span>
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
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                {productImages.length > 1 ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {productImages.map((image: string, index: number) => (
                        <CarouselItem key={index}>
                          {renderProductImage(image, index)}
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                ) : (
                  renderProductImage(productImages[0], 0)
                )}
              </div>
              
              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productImages.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${
                        selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                      }`}
                    >
                      {image.startsWith('data:') || image.startsWith('http') ? (
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded">
                          <span className="text-2xl">{image}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <Badge className="mb-2 bg-orange-100 text-orange-800">
                      {product.category || 'Lemon Pickle'}
                    </Badge>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-gray-500">({product.reviews || 0} reviews)</span>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <Badge variant="secondary">SKU: {product.sku}</Badge>
                  </div>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-red-600">₹{product.price}</span>
                    <span className="text-gray-500">/{product.weight}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={product.stock > 10 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
                    </Badge>
                    <span className="text-sm text-gray-500">{product.stock} units available</span>
                  </div>

                  <Separator />

                  {/* Quantity Selector */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Quantity</label>
                      <div className="flex items-center space-x-3 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(-1)}
                          className="w-10 h-10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(1)}
                          className="w-10 h-10"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        size="lg"
                        onClick={addToCart}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                      <Button 
                        size="lg"
                        onClick={buyNow}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Features */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Why Choose Our Pickles?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <ChefHat className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="font-medium">Traditional Recipe</p>
                      <p className="text-sm text-gray-600">Time-honored preparation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium">100% Natural</p>
                      <p className="text-sm text-gray-600">No preservatives</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium">Fast Delivery</p>
                      <p className="text-sm text-gray-600">Across India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('tel:+919798633639')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('https://wa.me/919798633639?text=Hi%20I%20want%20to%20know%20more%20about%20this%20product', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}