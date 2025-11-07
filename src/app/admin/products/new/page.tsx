'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Save, Eye, Plus, X, Upload, Image as ImageIcon, Percent, Star } from 'lucide-react'
import Link from 'next/link'

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    weight: '',
    sku: '',
    featured: false,
    status: 'active',
    discountType: 'none',
    discountValue: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    images: [] as string[]
  })

  const [newImage, setNewImage] = useState('')
  const [newTag, setNewTag] = useState('')
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url')

  useEffect(() => {
    // Check authentication
    const adminAuth = localStorage.getItem('adminAuth')
    const loginTime = localStorage.getItem('adminLoginTime')
    
    if (!adminAuth || !loginTime) {
      router.push('/admin/login')
      return
    }

    const sessionAge = Date.now() - parseInt(loginTime)
    const maxSessionAge = 2 * 60 * 60 * 1000
    
    if (sessionAge > maxSessionAge) {
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminLoginTime')
      router.push('/admin/login')
      return
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    setError('')
  }

  const addImage = () => {
    if (newImage.trim() && formData.images.length < 5) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }))
      setNewImage('')
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags ? `${prev.tags}, ${newTag.trim()}` : newTag.trim()
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.split(', ').filter(tag => tag !== tagToRemove).join(', ')
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        // Directly add to images array
        if (formData.images.length < 5) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, result]
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const calculateDiscountedPrice = () => {
    const price = parseFloat(formData.price) || 0
    const originalPrice = parseFloat(formData.originalPrice) || 0
    
    if (formData.discountType === 'percentage' && formData.discountValue) {
      const discount = parseFloat(formData.discountValue) || 0
      return price - (price * discount / 100)
    } else if (formData.discountType === 'fixed' && formData.discountValue) {
      const discount = parseFloat(formData.discountValue) || 0
      return Math.max(0, price - discount)
    }
    return price
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validation
      if (!formData.name || !formData.price || !formData.category || !formData.stock) {
        setError('Please fill in all required fields')
        setIsLoading(false)
        return
      }

      if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        setError('Please enter a valid price')
        setIsLoading(false)
        return
      }

      if (formData.originalPrice && (isNaN(Number(formData.originalPrice)) || Number(formData.originalPrice) <= 0)) {
        setError('Please enter a valid original price')
        setIsLoading(false)
        return
      }

      if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
        setError('Please enter a valid stock quantity')
        setIsLoading(false)
        return
      }

      if (formData.images.length === 0) {
        setError('Please add at least one product image')
        setIsLoading(false)
        return
      }

      // Create product object
      const newProduct = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        stock: Number(formData.stock),
        weight: formData.weight || '500g',
        sku: formData.sku || `SKU-${Date.now()}`,
        featured: formData.featured,
        status: formData.status,
        images: formData.images,
        discountType: formData.discountType,
        discountValue: formData.discountValue ? Number(formData.discountValue) : undefined,
        finalPrice: calculateDiscountedPrice(),
        tags: formData.tags.split(', ').filter(tag => tag.trim()),
        seoTitle: formData.seoTitle || formData.name,
        seoDescription: formData.seoDescription || formData.description,
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Get existing products
      const existingProducts = JSON.parse(localStorage.getItem('biharAcharProducts') || '[]')
      const updatedProducts = [...existingProducts, newProduct]
      
      // Save to localStorage (use same key as frontend)
      localStorage.setItem('biharAcharProducts', JSON.stringify(updatedProducts))
      
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('productsUpdated'))

      setSuccess(true)
      setIsLoading(false)
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        stock: '',
        weight: '',
        sku: '',
        featured: false,
        status: 'active',
        discountType: 'none',
        discountValue: '',
        tags: '',
        seoTitle: '',
        seoDescription: '',
        images: []
      })
      
      setNewImage('')
      setUploadMode('url')

      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 2000)

    } catch (error) {
      setError('Failed to add product. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-red-800">Add New Product</h1>
                <p className="text-sm text-gray-600">Professional Product Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-700">
                      Product added successfully! Redirecting to dashboard...
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Traditional Mango Achar"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      name="sku"
                      type="text"
                      value={formData.sku}
                      onChange={handleInputChange}
                      placeholder="e.g., SKU-001"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Mango Pickle">Mango Pickle</option>
                      <option value="Lemon Pickle">Lemon Pickle</option>
                      <option value="Mixed Pickle">Mixed Pickle</option>
                      <option value="Garlic Pickle">Garlic Pickle</option>
                      <option value="Chili Pickle">Chili Pickle</option>
                      <option value="Tomato Pickle">Tomato Pickle</option>
                      <option value="Special Pickle">Special Pickle</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your pickle in detail..."
                    rows={4}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Mode Toggle */}
                <div className="flex space-x-2 mb-4">
                  <Button
                    type="button"
                    variant={uploadMode === 'url' ? 'default' : 'outline'}
                    onClick={() => setUploadMode('url')}
                    className="flex-1"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    URL/Emoji
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMode === 'upload' ? 'default' : 'outline'}
                    onClick={() => setUploadMode('upload')}
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>

                {/* URL/Emoji Input */}
                {uploadMode === 'url' && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter image URL or emoji (e.g., 🥭)"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addImage} disabled={formData.images.length >= 5}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                )}

                {/* File Upload */}
                {uploadMode === 'upload' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Click to upload image or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                    
                    {newImage && (
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 border rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={newImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Image Preview</p>
                          <p className="text-xs text-gray-500">Ready to add</p>
                        </div>
                        <Button
                          type="button"
                          onClick={addImage}
                          disabled={formData.images.length >= 5}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Image
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Display Added Images */}
                {formData.images.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Added Images ({formData.images.length}/5)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                            {image.startsWith('data:') || image.startsWith('http') ? (
                              <img 
                                src={image} 
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Error'
                                }}
                              />
                            ) : (
                              <span className="text-4xl">{image}</span>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  Add up to 5 images. Use emojis, image URLs, or upload from your computer.
                </p>
              </CardContent>
            </Card>

            {/* Pricing & Inventory */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Pricing & Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="price">Sale Price (₹) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="180"
                      min="0"
                      step="1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      name="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="250"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="50"
                      min="0"
                      step="1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="text"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g., 500g, 1kg"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discount Settings */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Discount Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="discountType">Discount Type</Label>
                    <select
                      id="discountType"
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="none">No Discount</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>

                  {formData.discountType !== 'none' && (
                    <div>
                      <Label htmlFor="discountValue">
                        Discount Value {formData.discountType === 'percentage' ? '(%)' : '(₹)'}
                      </Label>
                      <Input
                        id="discountValue"
                        name="discountValue"
                        type="number"
                        value={formData.discountValue}
                        onChange={handleInputChange}
                        placeholder={formData.discountType === 'percentage' ? '10' : '50'}
                        min="0"
                        max={formData.discountType === 'percentage' ? '100' : undefined}
                        step={formData.discountType === 'percentage' ? '1' : '1'}
                      />
                    </div>
                  )}

                  {formData.discountType !== 'none' && formData.price && (
                    <div>
                      <Label>Final Price</Label>
                      <div className="p-2 bg-green-50 border rounded-md">
                        <span className="text-lg font-bold text-green-700">
                          ₹{calculateDiscountedPrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Product Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add tag (e.g., spicy, homemade)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tag
                  </Button>
                </div>

                {formData.tags && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.split(', ').filter(tag => tag.trim()).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SEO */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    name="seoTitle"
                    type="text"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    placeholder="SEO title for search engines"
                  />
                </div>

                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <textarea
                    id="seoDescription"
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleInputChange}
                    placeholder="SEO description for search engines"
                    rows={3}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </Button>
              
              <Link href="/admin/dashboard">
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}