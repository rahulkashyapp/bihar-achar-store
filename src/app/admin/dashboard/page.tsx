'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  LogOut,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Star,
  Image as ImageIcon,
  Percent,
  MessageSquare,
  PlusCircle,
  Megaphone,
  DollarSign,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalAds: 0,
    activeAds: 0
  });
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('5');
  const [loading, setLoading] = useState(true);
  const [upiId, setUpiId] = useState('rahulkashyap9798@ybl');
  const [paymentInstructions, setPaymentInstructions] = useState('Please make the payment and upload the screenshot. We\'ll verify and process your order within 24 hours.');
  const [storeName, setStoreName] = useState('Bihar Achar Store');
  const [contactNumber, setContactNumber] = useState('+91 97986 36339');
  const [storeEmail, setStoreEmail] = useState('info@biharachar.com');
  const [savingSettings, setSavingSettings] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const adminAuth = localStorage.getItem('adminAuth');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (!adminAuth || !loginTime) {
      router.push('/admin/login');
      return;
    }

    // Check if session is older than 2 hours
    const sessionAge = Date.now() - parseInt(loginTime);
    const maxSessionAge = 2 * 60 * 60 * 1000 // 2 hours
    
    if (sessionAge > maxSessionAge) {
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminLoginTime');
      router.push('/admin/login');
      return;
    }

    // Load data
    loadDashboardData();
    loadSettings();
  }, [router]);

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('adminSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setUpiId(settings.upiId || 'rahulkashyap9798@ybl');
        setPaymentInstructions(settings.paymentInstructions || 'Please make the payment and upload the screenshot. We\'ll verify and process your order within 24 hours.');
        setStoreName(settings.storeName || 'Bihar Achar Store');
        setContactNumber(settings.contactNumber || '+91 97986 36339');
        setStoreEmail(settings.storeEmail || 'info@biharachar.com');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      const settings = {
        upiId,
        paymentInstructions,
        storeName,
        contactNumber,
        storeEmail,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      // Show success message
      alert('Settings saved successfully!');
      
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: settings }));
      
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSavingSettings(false);
    }
  };

  const syncProductsToDatabase = async (products: any[]) => {
    try {
      console.log('Syncing products to database...');
      const response = await fetch('/api/admin/sync-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log(`Synced ${data.data.syncedCount} new products, updated ${data.data.updatedCount} products`);
        }
      } else {
        console.error('Failed to sync products to database');
      }
    } catch (error) {
      console.error('Error syncing products:', error);
    }
  };

  const loadDashboardData = async () => {
    try {
      // Load products from localStorage
      const savedProducts = localStorage.getItem('biharAcharProducts');
      let productsData = [];
      
      if (savedProducts) {
        try {
          productsData = JSON.parse(savedProducts);
          // Sync products to database
          await syncProductsToDatabase(productsData);
        } catch (error) {
          console.error('Error loading products:', error);
        }
      }
      
      // If no products in localStorage, use sample data
      if (productsData.length === 0) {
        productsData = [
          {
            id: '1',
            name: 'Traditional Mango Achar',
            description: 'Authentic Bihar-style raw mango pickle with mustard oil and traditional spices',
            price: 180,
            originalPrice: 250,
            stock: 15,
            category: 'Mango Pickle',
            featured: true,
            status: 'active',
            images: ['🥭'],
            discountType: 'percentage',
            discountValue: 28,
            finalPrice: 180,
            tags: ['traditional', 'spicy', 'homemade'],
            rating: 4.8,
            reviews: 124,
            weight: '500g',
            sku: 'SKU-001',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Lemon Mirchi Achar',
            description: 'Tangy lemon and green chili pickle with a perfect blend of spices',
            price: 150,
            stock: 20,
            category: 'Lemon Pickle',
            featured: false,
            status: 'active',
            images: ['🍋'],
            tags: ['tangy', 'spicy'],
            rating: 4.7,
            reviews: 89,
            weight: '400g',
            sku: 'SKU-002',
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            name: 'Mixed Vegetable Achar',
            description: 'A delightful mix of seasonal vegetables in traditional spices',
            price: 200,
            originalPrice: 280,
            stock: 10,
            category: 'Mixed Pickle',
            featured: true,
            status: 'active',
            images: ['🥗'],
            discountType: 'percentage',
            discountValue: 29,
            finalPrice: 200,
            tags: ['mixed', 'seasonal', 'healthy'],
            rating: 4.9,
            reviews: 156,
            weight: '600g',
            sku: 'SKU-003',
            createdAt: new Date().toISOString()
          }
        ];
      }

      // Sample orders
      const sampleOrders = [
        {
          id: 'BAS12345678',
          customerName: 'Priya Sharma',
          customerPhone: '9876543210',
          totalAmount: 530,
          status: 'pending',
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
          orderItems: [
            { productName: 'Traditional Mango Achar', quantity: 2, price: 180 },
            { productName: 'Lemon Mirchi Achar', quantity: 1, price: 150 }
          ]
        },
        {
          id: 'BAS12345679',
          customerName: 'Rahul Kumar',
          customerPhone: '9876543211',
          totalAmount: 400,
          status: 'packed',
          paymentStatus: 'paid',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          orderItems: [
            { productName: 'Mixed Vegetable Achar', quantity: 2, price: 200 }
          ]
        },
        {
          id: 'BAS12345680',
          customerName: 'Anita Singh',
          customerPhone: '9876543212',
          totalAmount: 180,
          status: 'shipped',
          paymentStatus: 'paid',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          orderItems: [
            { productName: 'Traditional Mango Achar', quantity: 1, price: 180 }
          ]
        }
      ];

      // Load reviews from localStorage
      const savedReviews = localStorage.getItem('biharAcharReviews');
      let reviewsData = [];
      
      if (savedReviews) {
        try {
          reviewsData = JSON.parse(savedReviews);
        } catch (error) {
          console.error('Error loading reviews:', error);
        }
      }
      
      // If no reviews in localStorage, use sample data
      if (reviewsData.length === 0) {
        reviewsData = [
          {
            id: '1',
            productId: '1',
            productName: 'Traditional Mango Achar',
            customerName: 'Priya Sharma',
            rating: 5,
            review: 'The taste reminds me of my grandmother\'s pickle. Absolutely authentic and delicious!',
            date: new Date().toISOString(),
            status: 'approved'
          },
          {
            id: '2',
            productId: '2',
            productName: 'Lemon Mirchi Achar',
            customerName: 'Rahul Kumar',
            rating: 4,
            review: 'Being away from home, this pickle brings back the taste of Bihar. Highly recommended!',
            date: new Date(Date.now() - 86400000).toISOString(),
            status: 'approved'
          },
          {
            id: '3',
            productId: '3',
            productName: 'Mixed Vegetable Achar',
            customerName: 'Anita Singh',
            rating: 5,
            review: 'Fresh ingredients and perfect balance of spices. My family loves it!',
            date: new Date(Date.now() - 172800000).toISOString(),
            status: 'approved'
          }
        ];
      }

      setProducts(productsData);
      setOrders(sampleOrders);
      setReviews(reviewsData);

      // Load ads from localStorage
      const savedAds = localStorage.getItem('biharAcharAds');
      let adsData = [];
      
      if (savedAds) {
        try {
          adsData = JSON.parse(savedAds);
        } catch (error) {
          console.error('Error loading ads:', error);
        }
      }
      
      // If no ads in localStorage, use sample data
      if (adsData.length === 0) {
        adsData = [
          {
            id: '1',
            title: 'Special Offer - 20% Off',
            description: 'Get 20% off on all mango pickles this week only!',
            type: 'banner',
            position: 'header',
            imageUrl: '',
            linkUrl: '',
            status: 'active',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            clicks: 45,
            impressions: 1250,
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Free Delivery',
            description: 'Free delivery on orders above ₹500',
            type: 'sidebar',
            position: 'sidebar',
            imageUrl: '',
            linkUrl: '',
            status: 'active',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            clicks: 23,
            impressions: 890,
            createdAt: new Date().toISOString()
          }
        ];
      }

      setAds(adsData);

      // Calculate stats
      const totalRevenue = sampleOrders
        .filter(order => order.paymentStatus === 'paid')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      setStats({
        totalProducts: productsData.length,
        totalOrders: sampleOrders.length,
        pendingOrders: sampleOrders.filter(order => order.status === 'pending').length,
        totalRevenue,
        totalAds: adsData.length,
        activeAds: adsData.filter(ad => ad.status === 'active').length
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminLoginTime');
    router.push('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      packed: { color: 'bg-blue-100 text-blue-800', icon: Package, label: 'Packed' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck, label: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelled' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentBadge = (status: string) => {
    return (
      <Badge className={status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
        {status === 'paid' ? 'Paid' : 'Pending'}
      </Badge>
    );
  };

  const deleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('biharAcharProducts', JSON.stringify(updatedProducts));
      
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('productsUpdated'));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalProducts: updatedProducts.length
      }));
    }
  };

  const addReview = async () => {
    const nameInput = document.getElementById('review-name') as HTMLInputElement;
    const reviewInput = document.getElementById('review-text') as HTMLTextAreaElement;
    const dateInput = document.getElementById('review-date') as HTMLInputElement;

    const name = nameInput?.value.trim();
    const reviewText = reviewInput?.value.trim();
    const date = dateInput?.value;

    if (!name || !reviewText || !date || !selectedProductId) {
      alert('Please fill in all fields and select a product');
      return;
    }

    // Get products from localStorage to find the selected product
    const products = JSON.parse(localStorage.getItem('biharAcharProducts') || '[]');
    const product = products.find((p: any) => p.id === selectedProductId);
    
    if (!product) {
      alert('Please select a valid product');
      return;
    }

    try {
      // First, ensure product exists in database
      console.log('Ensuring product exists in database...');
      const productResponse = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id, // Include ID to match
          name: product.name,
          description: product.description || 'Product description',
          price: product.price || 0,
          weight: product.weight || '500g',
          category: product.category || 'General',
          imageUrl: product.images?.[0] || product.image,
          ingredients: product.ingredients,
          shelfLife: product.shelfLife,
          stock: product.stock || 0,
          featured: product.featured || false
        }),
      });

      let dbProduct = null;
      if (productResponse.ok) {
        const productData = await productResponse.json();
        if (productData.success) {
          dbProduct = productData.data;
          console.log('Product saved to database:', dbProduct.name);
        }
      }

      // Use the database product ID or fallback to localStorage product ID
      const finalProductId = dbProduct?.id || product.id;

      // Save to database via API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: finalProductId,
          customerName: name,
          rating: parseInt(selectedRating),
          comment: reviewText,
        }),
      });

      console.log('Review API Response Status:', response.status);
      console.log('Review API Request Body:', {
        productId: finalProductId,
        customerName: name,
        rating: parseInt(selectedRating),
        comment: reviewText,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Review API Response Data:', data);
        
        if (data.success) {
          // Also save to localStorage for admin panel display
          const newReview = {
            id: data.data.id,
            productId: finalProductId,
            productName: product.name,
            customerName: name,
            rating: parseInt(selectedRating),
            review: reviewText,
            date: new Date(date).toISOString(),
            status: 'approved'
          };

          const updatedReviews = [...reviews, newReview];
          setReviews(updatedReviews);
          localStorage.setItem('biharAcharReviews', JSON.stringify(updatedReviews));

          // Clear form and reset state
          nameInput.value = '';
          reviewInput.value = '';
          dateInput.value = new Date().toISOString().split('T')[0];
          setSelectedProductId('');
          setSelectedRating('5');

          alert('Review added successfully!');
        } else {
          console.error('API Error:', data.error);
          alert('Failed to add review: ' + data.error);
        }
      } else {
        const errorText = await response.text();
        console.error('API Response Error:', errorText);
        throw new Error(`Failed to save review: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review. Error: ' + error.message);
    }
  };

  const deleteReview = (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(r => r.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem('biharAcharReviews', JSON.stringify(updatedReviews));
    }
  };

  const addAd = () => {
    const titleInput = document.getElementById('ad-title') as HTMLInputElement;
    const descriptionInput = document.getElementById('ad-description') as HTMLTextAreaElement;
    const typeSelect = document.querySelector('[data-ads-type]') as HTMLButtonElement;
    const positionSelect = document.querySelector('[data-ads-position]') as HTMLButtonElement;
    const imageUrlInput = document.getElementById('ad-image-url') as HTMLInputElement;
    const linkUrlInput = document.getElementById('ad-link-url') as HTMLInputElement;
    const startDateInput = document.getElementById('ad-start-date') as HTMLInputElement;
    const endDateInput = document.getElementById('ad-end-date') as HTMLInputElement;

    const title = titleInput?.value.trim();
    const description = descriptionInput?.value.trim();
    const type = typeSelect?.textContent || 'banner';
    const position = positionSelect?.textContent || 'header';
    const imageUrl = imageUrlInput?.value.trim();
    const linkUrl = linkUrlInput?.value.trim();
    const startDate = startDateInput?.value;
    const endDate = endDateInput?.value;

    if (!title || !description || !startDate || !endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newAd = {
      id: Date.now().toString(),
      title,
      description,
      type: type.toLowerCase(),
      position: position.toLowerCase(),
      imageUrl,
      linkUrl,
      status: 'active',
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      clicks: 0,
      impressions: 0,
      createdAt: new Date().toISOString()
    };

    const updatedAds = [...ads, newAd];
    setAds(updatedAds);
    localStorage.setItem('biharAcharAds', JSON.stringify(updatedAds));

    // Clear form
    titleInput.value = '';
    descriptionInput.value = '';
    imageUrlInput.value = '';
    linkUrlInput.value = '';
    startDateInput.value = new Date().toISOString().split('T')[0];
    endDateInput.value = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Update stats
    setStats(prev => ({
      ...prev,
      totalAds: updatedAds.length,
      activeAds: updatedAds.filter(ad => ad.status === 'active').length
    }));

    alert('Advertisement added successfully!');
  };

  const deleteAd = (adId: string) => {
    if (confirm('Are you sure you want to delete this advertisement?')) {
      const updatedAds = ads.filter(ad => ad.id !== adId);
      setAds(updatedAds);
      localStorage.setItem('biharAcharAds', JSON.stringify(updatedAds));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalAds: updatedAds.length,
        activeAds: updatedAds.filter(ad => ad.status === 'active').length
      }));
    }
  };

  const toggleAdStatus = (adId: string) => {
    const updatedAds = ads.map(ad => 
      ad.id === adId 
        ? { ...ad, status: ad.status === 'active' ? 'inactive' : 'active' }
        : ad
    );
    setAds(updatedAds);
    localStorage.setItem('biharAcharAds', JSON.stringify(updatedAds));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      activeAds: updatedAds.filter(ad => ad.status === 'active').length
    }));
  };

  const renderProductImage = (product: any) => {
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage.startsWith('data:') || firstImage.startsWith('http')) {
        return (
          <img 
            src={firstImage} 
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/64x64?text=Error'
            }}
          />
        );
      } else {
        return <span className="text-3xl">{firstImage}</span>;
      }
    }
    return <ImageIcon className="w-8 h-8 text-gray-400" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🥭</div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🥭</div>
              <div>
                <h1 className="text-2xl font-bold text-red-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Bihar Achar Store - Professional Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/admin/settings">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Store
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={async () => {
                  const savedProducts = localStorage.getItem('biharAcharProducts');
                  if (savedProducts) {
                    const products = JSON.parse(savedProducts);
                    await syncProductsToDatabase(products);
                    alert('Images sync completed! Please refresh the page.');
                    window.location.reload();
                  } else {
                    alert('No products found in localStorage');
                  }
                }}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Fix Images
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">₹{stats.totalRevenue}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Ads</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalAds}</p>
                </div>
                <Megaphone className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Ads</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.activeAds}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="ads">Advertisements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button>
                  <Eye className="w-4 h-4 mr-2" />
                  View All Orders
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.customerName} • {order.customerPhone}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-bold text-lg">₹{order.totalAmount}</p>
                          <div className="space-x-2">
                            {getStatusBadge(order.status)}
                            {getPaymentBadge(order.paymentStatus)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {order.orderItems.map((item: any, index: number) => (
                          <span key={index}>
                            {item.productName} x {item.quantity}
                            {index < order.orderItems.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Update Status
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Products ({products.length})</CardTitle>
                <Link href="/admin/products/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            {renderProductImage(product)}
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              {product.featured && (
                                <Badge variant="secondary">Featured</Badge>
                              )}
                              <Badge className={product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {product.status}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                              <span>SKU: {product.sku}</span>
                              <span>Stock: {product.stock}</span>
                              <span>Weight: {product.weight}</span>
                            </div>

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {product.tags.map((tag: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* Rating */}
                            {product.rating > 0 && (
                              <div className="flex items-center space-x-1 text-sm mb-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{product.rating}</span>
                                <span className="text-gray-500">({product.reviews} reviews)</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Price and Actions */}
                        <div className="text-right space-y-2 ml-4">
                          <div className="text-right">
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="flex items-center justify-end space-x-2">
                                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                                {product.discountType && (
                                  <Badge variant="destructive" className="text-xs">
                                    <Percent className="w-3 h-3 mr-1" />
                                    {product.discountType === 'percentage' ? `${product.discountValue}%` : `₹${product.discountValue}`}
                                  </Badge>
                                )}
                              </div>
                            )}
                            <p className="text-xl font-bold text-red-600">₹{product.finalPrice || product.price}</p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteProduct(product.id)}
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Customer Reviews ({reviews.length})</CardTitle>
                <Button onClick={() => document.getElementById('add-review-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Review
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <p className="font-semibold">{review.customerName}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Product: {review.productName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteReview(review.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.review}</p>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <div id="add-review-form" className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Add New Review</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Customer Name</label>
                        <Input
                          id="review-name"
                          placeholder="Enter customer name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Product</label>
                        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Rating</label>
                        <Select value={selectedRating} onValueChange={setSelectedRating}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Stars - Excellent</SelectItem>
                            <SelectItem value="4">4 Stars - Very Good</SelectItem>
                            <SelectItem value="3">3 Stars - Good</SelectItem>
                            <SelectItem value="2">2 Stars - Fair</SelectItem>
                            <SelectItem value="1">1 Star - Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <Input
                          id="review-date"
                          type="date"
                          defaultValue={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Review</label>
                      <Textarea
                        id="review-text"
                        placeholder="Enter review text..."
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={addReview}>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Review
                      </Button>
                      <Button variant="outline" onClick={() => {
                        const nameInput = document.getElementById('review-name') as HTMLInputElement;
                        const reviewInput = document.getElementById('review-text') as HTMLTextAreaElement;
                        const dateInput = document.getElementById('review-date') as HTMLInputElement;
                        
                        if (nameInput) nameInput.value = '';
                        if (reviewInput) reviewInput.value = '';
                        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
                      }}>
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ads Tab */}
          <TabsContent value="ads">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Advertisements ({ads.length})</CardTitle>
                <Button onClick={() => document.getElementById('add-ad-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Advertisement
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ads.map((ad) => (
                    <div key={ad.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <p className="font-semibold">{ad.title}</p>
                            <Badge className={ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {ad.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                            <Badge variant="outline">{ad.type}</Badge>
                            <Badge variant="outline">{ad.position}</Badge>
                          </div>
                          <p className="text-gray-700 mb-2">{ad.description}</p>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p>Start: {new Date(ad.startDate).toLocaleDateString()}</p>
                            <p>End: {new Date(ad.endDate).toLocaleDateString()}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span>👁️ {ad.impressions} impressions</span>
                              <span>👆 {ad.clicks} clicks</span>
                              <span>📊 {ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : 0}% CTR</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toggleAdStatus(ad.id)}
                          >
                            {ad.status === 'active' ? 'Pause' : 'Activate'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteAd(ad.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      {ad.imageUrl && (
                        <div className="mt-3">
                          <img 
                            src={ad.imageUrl} 
                            alt={ad.title}
                            className="h-20 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Ad Form */}
                <div id="add-ad-form" className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Add New Advertisement</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Ad Title *</label>
                        <Input
                          id="ad-title"
                          placeholder="Enter advertisement title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Ad Type *</label>
                        <Select>
                          <SelectTrigger data-ads-type>
                            <SelectValue placeholder="Select ad type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="banner">Banner</SelectItem>
                            <SelectItem value="sidebar">Sidebar</SelectItem>
                            <SelectItem value="popup">Popup</SelectItem>
                            <SelectItem value="footer">Footer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description *</label>
                      <Textarea
                        id="ad-description"
                        placeholder="Enter advertisement description..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Position *</label>
                        <Select>
                          <SelectTrigger data-ads-position>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="header">Header</SelectItem>
                            <SelectItem value="sidebar">Sidebar</SelectItem>
                            <SelectItem value="footer">Footer</SelectItem>
                            <SelectItem value="home">Home Page</SelectItem>
                            <SelectItem value="product">Product Page</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <Input
                          id="ad-image-url"
                          placeholder="Enter image URL (optional)"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Link URL</label>
                        <Input
                          id="ad-link-url"
                          placeholder="Enter link URL (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Start Date *</label>
                        <Input
                          id="ad-start-date"
                          type="date"
                          defaultValue={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date *</label>
                      <Input
                        id="ad-end-date"
                        type="date"
                        defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={addAd}>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Advertisement
                      </Button>
                      <Button variant="outline" onClick={() => {
                        const titleInput = document.getElementById('ad-title') as HTMLInputElement;
                        const descriptionInput = document.getElementById('ad-description') as HTMLTextAreaElement;
                        const imageUrlInput = document.getElementById('ad-image-url') as HTMLInputElement;
                        const linkUrlInput = document.getElementById('ad-link-url') as HTMLInputElement;
                        const startDateInput = document.getElementById('ad-start-date') as HTMLInputElement;
                        const endDateInput = document.getElementById('ad-end-date') as HTMLInputElement;
                        
                        if (titleInput) titleInput.value = '';
                        if (descriptionInput) descriptionInput.value = '';
                        if (imageUrlInput) imageUrlInput.value = '';
                        if (linkUrlInput) linkUrlInput.value = '';
                        if (startDateInput) startDateInput.value = new Date().toISOString().split('T')[0];
                        if (endDateInput) endDateInput.value = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                      }}>
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">UPI ID</label>
                      <Input 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Instructions</label>
                      <textarea 
                        className="w-full p-2 border rounded-md" 
                        rows={3}
                        value={paymentInstructions}
                        onChange={(e) => setPaymentInstructions(e.target.value)}
                        placeholder="Enter payment instructions"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Email Configuration</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Gmail OTP Setup</h4>
                          <p className="text-sm text-blue-700 mt-1">Configure Gmail App Password for real OTP sending</p>
                        </div>
                        <Link href="/admin/gmail-setup">
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Store Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Store Name</label>
                      <Input 
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Enter store name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Number</label>
                      <Input 
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input 
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                        placeholder="Enter store email"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={saveSettings}
                  disabled={savingSettings}
                >
                  {savingSettings ? 'Saving...' : 'Save Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}