'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Phone, MessageCircle, ShoppingCart, Plus, Minus, Check, Truck, ChefHat, HeartHandshake, ShoppingBag, Facebook, Instagram, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdDisplay from '@/components/ads/AdDisplay';

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<{ [key: string]: number }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('biharAcharCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Load products from API first, then fallback to localStorage
    loadProducts();
    
    // Set up real-time listener for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'biharAcharProducts') {
        loadProducts();
      }
    };
    
    // Custom event listener for same-tab updates
    const handleCustomUpdate = () => {
      loadProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('productsUpdated', handleCustomUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleCustomUpdate);
    };
  }, []);

  const loadProducts = async () => {
    try {
      // First try to load from API (database)
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          // Transform database products to match frontend format
          const transformedProducts = data.data.map((product: any) => ({
            ...product,
            // Parse images JSON if it exists
            images: product.images ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images) : [],
            // Ensure image field exists for compatibility
            image: product.images ? (typeof product.images === 'string' ? JSON.parse(product.images)[0] : product.images[0]) : product.imageUrl || '🥭',
            // Add default values for missing fields
            rating: product.rating || 4.5,
            reviews: product.reviews || [],
            status: product.status || 'active'
          }));
          setProducts(transformedProducts);
          return;
        }
      }
    } catch (error) {
      console.error('Error loading products from API:', error);
    }

    // Fallback to localStorage
    const savedProducts = localStorage.getItem('biharAcharProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  };

  // Sample data - in real app this would come from API
  const categories = [
    { id: 1, name: 'Mango Pickle', image: '🥭', description: 'Traditional raw mango pickle' },
    { id: 2, name: 'Lemon Pickle', image: '🍋', description: 'Tangy lemon pickle' },
    { id: 3, name: 'Mixed Pickle', image: '🥗', description: 'Assorted vegetables' },
    { id: 4, name: 'Garlic Pickle', image: '🧄', description: 'Spicy garlic pickle' },
    { id: 5, name: 'Chili Pickle', image: '🌶️', description: 'Hot green chili pickle' },
    { id: 6, name: 'Tomato Pickle', image: '🍅', description: 'Sweet & sour tomato' }
  ];

  // Default products if no products exist
  const defaultProducts = [
    {
      id: 'default-1',
      name: 'Traditional Mango Achar',
      description: 'Authentic Bihar-style raw mango pickle with mustard oil and traditional spices',
      price: 180,
      weight: '500g',
      image: '🥭',
      images: ['🥭'],
      rating: 4.8,
      reviews: 124,
      stock: 15,
      category: 'Mango Pickle',
      sku: 'MANGO-500',
      status: 'active'
    },
    {
      id: 'default-2',
      name: 'Lemon Mirchi Achar',
      description: 'Tangy lemon and green chili pickle with a perfect blend of spices',
      price: 150,
      weight: '400g',
      image: '🍋',
      images: ['🍋'],
      rating: 4.7,
      reviews: 89,
      stock: 20,
      category: 'Lemon Pickle',
      sku: 'LEMON-400',
      status: 'active'
    },
    {
      id: 'default-3',
      name: 'Mixed Vegetable Achar',
      description: 'A delightful mix of seasonal vegetables in traditional spices',
      price: 200,
      weight: '600g',
      image: '🥗',
      images: ['🥗'],
      rating: 4.9,
      reviews: 156,
      stock: 10,
      category: 'Mixed Pickle',
      sku: 'MIXED-600',
      status: 'active'
    },
    {
      id: 'default-4',
      name: 'Garlic Achar',
      description: 'Spicy and flavorful garlic pickle with mustard oil',
      price: 220,
      weight: '450g',
      image: '🧄',
      images: ['🧄'],
      rating: 4.6,
      reviews: 67,
      stock: 12,
      category: 'Garlic Pickle',
      sku: 'GARLIC-450',
      status: 'active'
    }
  ];

  // Use products from localStorage or default products
  const displayProducts = products.length > 0 ? products.filter(p => p.status === 'active') : defaultProducts;

  // Handle hover image cycling
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    if (hoveredProduct) {
      // Use displayProducts instead of products to include default products
      const product = displayProducts.find(p => p.id === hoveredProduct);
      let productImages: string[] = [];
      
      // Parse images JSON if it exists
      if (product?.images) {
        try {
          if (typeof product.images === 'string') {
            productImages = JSON.parse(product.images);
          } else if (Array.isArray(product.images)) {
            productImages = product.images;
          }
        } catch (error) {
          console.error('Error parsing images JSON:', error);
        }
      }
      
      // Fallback to single image if no images array
      if (productImages.length === 0) {
        const singleImage = product?.image || product?.imageUrl;
        if (singleImage && singleImage !== '🥭') {
          productImages = [singleImage];
        }
      }
      
      if (productImages.length > 1) {
        const interval = setInterval(() => {
          setHoveredImageIndex(prev => ({
            ...prev,
            [hoveredProduct]: ((prev[hoveredProduct] || 0) + 1) % productImages.length
          }));
        }, 1500); // Change image every 1.5 seconds
        
        intervals.push(interval);
      }
    }
    
    return () => {
      intervals.forEach(clearInterval);
    };
  }, [hoveredProduct, displayProducts]);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Patna, Bihar',
      rating: 5,
      comment: 'The taste reminds me of my grandmother\'s pickle. Absolutely authentic and delicious!',
      avatar: '👩🏻‍🦳'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      location: 'Delhi',
      rating: 5,
      comment: 'Being away from home, this pickle brings back the taste of Bihar. Highly recommended!',
      avatar: '👨🏻‍💼'
    },
    {
      id: 3,
      name: 'Anita Singh',
      location: 'Mumbai',
      rating: 4,
      comment: 'Fresh ingredients and perfect balance of spices. My family loves it!',
      avatar: '👩🏻‍🏫'
    }
  ];

  const heroSlides = [
    {
      title: 'Authentic Bihar Achar',
      subtitle: 'Traditional Homemade Pickles',
      description: 'Experience the true taste of Bihar with our time-honored recipes',
      image: '🥭',
      cta: 'Shop Now'
    },
    {
      title: 'Fresh Ingredients',
      subtitle: 'Made with Love',
      description: 'Handcrafted with the finest ingredients and traditional methods',
      image: '🌶️',
      cta: 'Explore'
    },
    {
      title: 'Doorstep Delivery',
      subtitle: 'All Over India',
      description: 'Get your favorite pickles delivered fresh to your home',
      image: '📦',
      cta: 'Order Now'
    }
  ];

  const addToCart = (product: any) => {
    const quantity = quantities[product.id] || 1;
    const existingItem = cart.find(item => item.id === product.id);
    
    // Ensure image field exists for checkout page
    const productWithImage = {
      ...product,
      image: product.images?.[0] || product.image || product.imageUrl || '🥭'
    };
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...productWithImage, quantity }]);
    }
    
    // Save to localStorage
    const updatedCart = existingItem 
      ? cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...cart, { ...productWithImage, quantity }];
    localStorage.setItem('biharAcharCart', JSON.stringify(updatedCart));
    
    setQuantities({ ...quantities, [product.id]: 1 });
  };

  const buyNow = (product: any) => {
    router.push(`/product/${product.id}`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderProductImageWithHover = (product: any) => {
    // Check for images in priority order: images JSON array, image, imageUrl
    let productImages: string[] = [];
    
    // Parse images JSON if it exists
    if (product.images) {
      try {
        if (typeof product.images === 'string') {
          productImages = JSON.parse(product.images);
        } else if (Array.isArray(product.images)) {
          productImages = product.images;
        }
      } catch (error) {
        console.error('Error parsing images JSON:', error);
      }
    }
    
    // Fallback to single image if no images array
    if (productImages.length === 0) {
      const singleImage = product.image || product.imageUrl;
      if (singleImage && singleImage !== '🥭') {
        productImages = [singleImage];
      }
    }
    
    if (productImages.length > 0) {
      const imageIndex = hoveredImageIndex[product.id] || 0;
      const image = productImages[imageIndex];
      
      if (image.startsWith('data:') || image.startsWith('http')) {
        return (
          <img 
            src={image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              console.error('Image failed to load:', image);
              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error';
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', image);
            }}
          />
        );
      } else {
        return <span className="text-8xl">{image}</span>;
      }
    }
    return <span className="text-8xl">🥭</span>;
  };

  const renderProductImageCarousel = (product: any) => {
    // Check for images in priority order: images JSON array, image, imageUrl
    let productImages: string[] = [];
    
    // Parse images JSON if it exists
    if (product.images) {
      try {
        if (typeof product.images === 'string') {
          productImages = JSON.parse(product.images);
        } else if (Array.isArray(product.images)) {
          productImages = product.images;
        }
      } catch (error) {
        console.error('Error parsing images JSON:', error);
      }
    }
    
    // Fallback to single image if no images array
    if (productImages.length === 0) {
      const singleImage = product.image || product.imageUrl;
      if (singleImage && singleImage !== '🥭') {
        productImages = [singleImage];
      }
    }
    
    if (productImages.length > 1) {
      return (
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {productImages.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="flex justify-center">
                  {image.startsWith('data:') || image.startsWith('http') ? (
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        console.error('Carousel image failed to load:', image);
                        e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error'
                      }}
                      onLoad={() => {
                        console.log('Carousel image loaded successfully:', image);
                      }}
                    />
                  ) : (
                    <span className="text-8xl">{image}</span>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      );
    } else if (productImages.length === 1) {
      // Single image
      const image = productImages[0];
      if (image.startsWith('data:') || image.startsWith('http')) {
        return (
          <img 
            src={image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              console.error('Image failed to load:', image);
              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error';
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', image);
            }}
          />
        );
      } else {
        return <span className="text-8xl">{image}</span>;
      }
    } else {
      return renderProductImageWithHover(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-3xl">🥭</div>
              <div>
                <h1 className="text-2xl font-bold text-red-800">Bihar Achar Store</h1>
                <p className="text-xs text-gray-600">Traditional Homemade Pickles</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#home" className="text-gray-700 hover:text-red-700 transition">Home</Link>
              <Link href="#products" className="text-gray-700 hover:text-red-700 transition">Products</Link>
              <Link href="/about" className="text-gray-700 hover:text-red-700 transition">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-700 transition">Contact</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.open('tel:+919798633639')}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Header Ads */}
      <div className="container mx-auto px-4 py-4">
        <AdDisplay position="header" className="mb-4" />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[600px] bg-gradient-to-r from-red-600 to-orange-600 flex items-center">
                  <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-white space-y-6">
                      <Badge className="bg-yellow-400 text-yellow-900 w-fit">🌟 Traditional Recipe</Badge>
                      <h2 className="text-5xl md:text-6xl font-bold">{slide.title}</h2>
                      <p className="text-2xl text-orange-100">{slide.subtitle}</p>
                      <p className="text-lg text-orange-50">{slide.description}</p>
                      <div className="flex space-x-4">
                        <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold">
                          {slide.cta}
                        </Button>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="border-white text-white hover:bg-white hover:text-green-600"
                          onClick={() => window.open('https://wa.me/919798633639?text=Hi%20I%20want%20to%20order%20some%20pickles', '_blank')}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          WhatsApp Order
                        </Button>
                      </div>
                    </div>
                    <div className="text-9xl text-center animate-bounce">
                      {slide.image}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Categories Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">Our Pickle Categories</h2>
            <p className="text-gray-600 text-lg">Choose from our wide variety of traditional pickles</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {category.image}
                    </div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">Top Selling Products</h2>
            <p className="text-gray-600 text-lg">Our most loved and authentic pickles</p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Products Grid */}
            <div className="lg:col-span-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => {
              // Check if product has multiple images
              let productImages = product.images || [];
              const singleImage = product.image || product.imageUrl;
              
              if (productImages.length === 0 && singleImage && singleImage !== '🥭') {
                productImages = [singleImage];
              }
              
              const hasMultipleImages = productImages.length > 1;
              
              return (
              <Card 
                key={product.id} 
                className="hover:shadow-xl transition-shadow group"
                onMouseEnter={() => hasMultipleImages && setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CardHeader className="text-center p-4">
                  <div className="mb-4 group-hover:scale-105 transition-transform relative">
                    {hasMultipleImages ? (
                      <>
                        {renderProductImageWithHover(product)}
                        {productImages.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            {hoveredImageIndex[product.id] ? hoveredImageIndex[product.id] + 1 : 1}/{productImages.length}
                          </div>
                        )}
                      </>
                    ) : (
                      renderProductImageCarousel(product)
                    )}
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating || 4.5}</span>
                      <span className="text-xs text-gray-500">({product.reviews || 0})</span>
                    </div>
                    <Badge variant="secondary">{product.weight}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-red-600">₹{product.price}</span>
                      <span className="text-xs text-gray-500 ml-2">/{product.weight}</span>
                    </div>
                    <Badge className={product.stock > 10 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">
                      {quantities[product.id] || 1}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => buyNow(product)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
            </div>

            {/* Side Ads */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <AdDisplay position="sidebar" className="mb-6" />
                
                {/* Contact Card */}
                <Card className="bg-gradient-to-br from-red-600 to-orange-600 text-white">
                  <CardContent className="p-6 text-center">
                    <Phone className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Order via Phone</h3>
                    <p className="text-2xl font-bold mb-4">+91 97986 33639</p>
                    <p className="text-sm opacity-90 mb-4">Call us for bulk orders and custom requirements</p>
                    <Button 
                      className="w-full bg-white text-red-600 hover:bg-gray-100"
                      onClick={() => window.open('tel:+919798633639')}
                    >
                      Call Now
                    </Button>
                  </CardContent>
                </Card>

                {/* WhatsApp Card */}
                <Card className="bg-green-600 text-white">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">WhatsApp Order</h3>
                    <p className="text-sm opacity-90 mb-4">Get quick response and personalized service</p>
                    <Button 
                      className="w-full bg-white text-green-600 hover:bg-gray-100"
                      onClick={() => window.open('https://wa.me/919798633639?text=Hi%20I%20want%20to%20order%20some%20pickles', '_blank')}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Message on WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">Why Choose Bihar Achar Store?</h2>
            <p className="text-gray-600 text-lg">Experience the authentic taste of Bihar</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <ChefHat className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Traditional Recipe</h3>
                <p className="text-gray-600">Time-honored recipes passed down through generations</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">100% Natural</h3>
                <p className="text-gray-600">No preservatives, artificial colors or flavors</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Fast Delivery</h3>
                <p className="text-gray-600">Quick and secure delivery across India</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <HeartHandshake className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Quality Assured</h3>
                <p className="text-gray-600">Hygienically prepared with quality ingredients</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Real reviews from satisfied customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 shadow-lg">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Ads */}
      <div className="container mx-auto px-4 py-4">
        <AdDisplay position="footer" className="mb-4" />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-3xl">🥭</div>
                <h3 className="text-xl font-bold">Bihar Achar Store</h3>
              </div>
              <p className="text-gray-400">Authentic traditional homemade pickles from Bihar, made with love and care.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#home" className="hover:text-white transition">Home</Link></li>
                <li><Link href="#products" className="hover:text-white transition">Products</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 97986 33639</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Available</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pan India Delivery</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Bihar Achar Store. All rights reserved. Made with ❤️ in Bihar</p>
          </div>
        </div>
      </footer>
    </div>
  );
}