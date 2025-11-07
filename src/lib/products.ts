'use client'

import { useState, useEffect } from 'react'

export interface Product {
  id?: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  inStock: boolean
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Load products from localStorage on mount
    const savedProducts = localStorage.getItem('biharAcharProducts')
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }
  }, [])

  const addProduct = (product: Product) => {
    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    
    // Save to localStorage
    localStorage.setItem('biharAcharProducts', JSON.stringify(updatedProducts))
  }

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id)
    setProducts(updatedProducts)
    
    // Save to localStorage
    localStorage.setItem('biharAcharProducts', JSON.stringify(updatedProducts))
  }

  const saveProducts = (productsToSave: Product[]) => {
    setProducts(productsToSave)
    
    // Save to localStorage
    localStorage.setItem('biharAcharProducts', JSON.stringify(productsToSave))
  }

  return {
    products,
    addProduct,
    deleteProduct,
    saveProducts
  }
}