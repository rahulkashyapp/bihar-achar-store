'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('biharAcharCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Load products from localStorage
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
  }, [params.slug]);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('biharAcharProducts');
    if (savedProducts) {
      const allProducts = JSON.parse(savedProducts);
      const categorySlug = params.slug as string;
      
      // Convert slug to readable category name
      const name = categorySlug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      setCategoryName(name);
      
      // Filter products by category
      const filteredProducts = allProducts.filter((product: any) => 
        product.category?.toLowerCase() === name.toLowerCase() && 
        product.status === 'active'
      );
      setProducts(filteredProducts);
    }
  };

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

  const renderProductImage = (product: any) => {
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage.startsWith('data:') || firstImage.startsWith('http')) {
        return (
          <img 
            src={firstImage} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Error'
            }}
          />
        );
      } else {
        return <span className="text-8xl">{firstImage}</span>;
      }
    }
    return <span className="text-8xl">🥭</span>;
  };

  const renderProductImageCarousel = (product: any) => {
    if (product.images && product.images.length > 1) {
      return (
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="flex justify-center">
                  {image.startsWith('data:') || image.startsWith('http') ? (
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Error'
                      }}
                    />
                  ) : (
                    <span className="text-8xl">{image}</span>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {product.images.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
      );
    } else {
      return renderProductImage(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="text-3xl">🥭</div>
                <div>
                  <h1 className="text-2xl font-bold text-red-800">Bihar Achar Store</h1>
                  <p className="text-xs text-gray-600">Traditional Homemade Pickles</p>
                </div>
              </div>
            </div>

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
            </div>
          </div>
        </div>
      </header>

      {/* Category Header */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryName}</h1>
          <p className="text-xl text-orange-100">
            {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-xl transition-shadow group">
                  <CardHeader className="text-center p-4">
                    <div className="mb-4 group-hover:scale-105 transition-transform">
                      {renderProductImageCarousel(product)}
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
                        <p className="text-2xl font-bold text-red-600">₹{product.price}</p>
                        <p className="text-xs text-green-600">Stock: {product.stock}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(product.id.toString(), -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">{quantities[product.id] || 1}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(product.id.toString(), 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => buyNow(product)}
                        disabled={product.stock === 0}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                      <Button 
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                No products available in the {categoryName} category yet.
              </p>
              <Link href="/">
                <Button className="bg-red-600 hover:bg-red-700">
                  Browse All Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}