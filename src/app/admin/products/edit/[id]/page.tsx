'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newTag, setNewTag] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = () => {
    try {
      const savedProducts = localStorage.getItem('biharAcharProducts');
      let products = [];
      
      if (savedProducts) {
        products = JSON.parse(savedProducts);
      } else {
        // Load default products if none exist
        products = [
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
            ingredients: 'Raw Mango, Mustard Oil, Salt, Turmeric, Spices',
            nutritionalInfo: 'Calories: 45 kcal\nProtein: 1.2g\nCarbohydrates: 8.5g\nFat: 1.8g\nFiber: 2.1g',
            shelfLife: '12 months',
            storage: 'Store in cool and dry place',
            features: ['100% Natural', 'No Preservatives', 'Traditional Recipe'],
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
            ingredients: 'Lemon, Green Chilies, Mustard Oil, Salt, Spices',
            nutritionalInfo: 'Calories: 35, Protein: 0.8g, Carbs: 7.2g',
            shelfLife: '10 months',
            storage: 'Refrigerate after opening',
            features: ['Rich in Vitamin C', 'Digestive Aid'],
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
            ingredients: 'Mixed Vegetables, Mustard Oil, Salt, Spices',
            nutritionalInfo: 'Calories: 40, Protein: 1.5g, Carbs: 7.8g',
            shelfLife: '8 months',
            storage: 'Store in airtight container',
            features: ['Mixed Vegetables', 'High in Fiber'],
            createdAt: new Date().toISOString()
          }
        ];
      }

      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        alert('Product not found!');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      alert('Error loading product');
      router.push('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!product) return;
    
    setSaving(true);
    try {
      // Validate required fields
      if (!product.name || !product.price || !product.category) {
        alert('Please fill in all required fields');
        setSaving(false);
        return;
      }

      // Calculate final price if discount is applied
      let finalPrice = product.price;
      if (product.discountType && product.discountValue) {
        if (product.discountType === 'percentage') {
          finalPrice = product.price * (1 - product.discountValue / 100);
        } else {
          finalPrice = product.price - product.discountValue;
        }
      }
      
      const updatedProduct = {
        ...product,
        finalPrice: Math.round(finalPrice),
        updatedAt: new Date().toISOString()
      };

      // Load existing products
      const savedProducts = localStorage.getItem('biharAcharProducts');
      let products = [];
      
      if (savedProducts) {
        products = JSON.parse(savedProducts);
      }

      // Update the product
      const updatedProducts = products.map((p: any) => 
        p.id === productId ? updatedProduct : p
      );

      // Save to localStorage
      localStorage.setItem('biharAcharProducts', JSON.stringify(updatedProducts));

      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('productsUpdated'));

      alert('Product updated successfully!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!product) return;
    
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        // Load existing products
        const savedProducts = localStorage.getItem('biharAcharProducts');
        let products = [];
        
        if (savedProducts) {
          products = JSON.parse(savedProducts);
        }

        // Remove the product
        const updatedProducts = products.filter((p: any) => p.id !== productId);

        // Save to localStorage
        localStorage.setItem('biharAcharProducts', JSON.stringify(updatedProducts));

        // Trigger custom event for real-time updates
        window.dispatchEvent(new CustomEvent('productsUpdated'));

        alert('Product deleted successfully!');
        router.push('/admin/dashboard');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const addImage = () => {
    if (newImage.trim() && product) {
      handleInputChange('images', [...(product.images || []), newImage.trim()]);
      setNewImage('');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (product) {
          handleInputChange('images', [...(product.images || []), base64String]);
        }
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    if (product && product.images) {
      const updatedImages = product.images.filter((_: any, i: number) => i !== index);
      handleInputChange('images', updatedImages);
    }
  };

  const addTag = () => {
    if (newTag.trim() && product) {
      handleInputChange('tags', [...(product.tags || []), newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    if (product && product.tags) {
      const updatedTags = product.tags.filter((_: any, i: number) => i !== index);
      handleInputChange('tags', updatedTags);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/admin/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Edit Product</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={product.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={product.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    placeholder="Enter product description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={product.category || ''} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mango Pickle">Mango Pickle</SelectItem>
                        <SelectItem value="Lemon Pickle">Lemon Pickle</SelectItem>
                        <SelectItem value="Mixed Pickle">Mixed Pickle</SelectItem>
                        <SelectItem value="Garlic Pickle">Garlic Pickle</SelectItem>
                        <SelectItem value="Chili Pickle">Chili Pickle</SelectItem>
                        <SelectItem value="Tomato Pickle">Tomato Pickle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={product.weight || ''}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="e.g., 500g"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={product.sku || ''}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      placeholder="e.g., SKU-001"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={product.stock || ''}
                      onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Selling Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={product.price || ''}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={product.originalPrice || ''}
                      onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discountType">Discount Type</Label>
                    <Select value={product.discountType || ''} onValueChange={(value) => handleInputChange('discountType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Discount</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="discountValue">Discount Value</Label>
                    <Input
                      id="discountValue"
                      type="number"
                      value={product.discountValue || ''}
                      onChange={(e) => handleInputChange('discountValue', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                {product.finalPrice && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      Final Price: <span className="font-bold text-lg">₹{product.finalPrice}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Image Options */}
                <div className="space-y-4">
                  {/* URL Input */}
                  <div className="flex space-x-2">
                    <Input
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="Enter emoji or image URL"
                    />
                    <Button onClick={addImage}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* File Upload */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={`flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                          uploadingImage
                            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                            : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.images?.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {image.startsWith('http') || image.startsWith('data:') ? (
                          <img 
                            src={image} 
                            alt={`Product ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <span className="text-4xl">{image}</span>
                        )}
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {index + 1}/{product.images?.length || 0}
                      </div>
                    </div>
                  ))}
                </div>

                {product.images?.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No images added yet</p>
                    <p className="text-sm">Add images using URL or upload from your device</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Enter tag"
                  />
                  <Button onClick={addTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => removeTag(index)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Product Status</Label>
                  <Select value={product.status || ''} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={product.featured || false}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Textarea
                    id="ingredients"
                    value={product.ingredients || ''}
                    onChange={(e) => handleInputChange('ingredients', e.target.value)}
                    rows={3}
                    placeholder="List ingredients"
                  />
                </div>

                <div>
                  <Label htmlFor="nutritionalInfo">Nutritional Info</Label>
                  <Textarea
                    id="nutritionalInfo"
                    value={product.nutritionalInfo || ''}
                    onChange={(e) => handleInputChange('nutritionalInfo', e.target.value)}
                    rows={4}
                    placeholder="Enter nutritional information (one per line):&#10;Calories: 45 kcal&#10;Protein: 1.2g&#10;Carbohydrates: 8.5g&#10;Fat: 1.8g&#10;Fiber: 2.1g"
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter each nutritional value on a new line for better formatting
                  </p>
                </div>

                <div>
                  <Label htmlFor="shelfLife">Shelf Life</Label>
                  <Input
                    id="shelfLife"
                    value={product.shelfLife || ''}
                    onChange={(e) => handleInputChange('shelfLife', e.target.value)}
                    placeholder="e.g., 12 months"
                  />
                </div>

                <div>
                  <Label htmlFor="storage">Storage Instructions</Label>
                  <Input
                    id="storage"
                    value={product.storage || ''}
                    onChange={(e) => handleInputChange('storage', e.target.value)}
                    placeholder="Storage instructions"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}