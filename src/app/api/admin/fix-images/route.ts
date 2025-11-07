import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get products from localStorage equivalent (we need to parse from request)
    const body = await request.json();
    const { products } = body;
    
    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { success: false, error: 'Products array is required' },
        { status: 400 }
      );
    }
    
    let updatedCount = 0;
    
    for (const product of products) {
      try {
        // Check if product already exists
        const existingProduct = await db.product.findUnique({
          where: { id: product.id }
        });
        
        if (existingProduct) {
          // Get the best image from the product
          const bestImage = product.images?.[0] || product.image || product.imageUrl;
          
          // Update existing product with proper image
          await db.product.update({
            where: { id: product.id },
            data: {
              imageUrl: bestImage,
              updatedAt: new Date()
            }
          });
          updatedCount++;
          console.log(`Updated product ${product.name} with image: ${bestImage?.substring(0, 50)}...`);
        }
      } catch (productError) {
        console.error(`Error updating product ${product.id}:`, productError);
      }
    }
    
    console.log(`Updated ${updatedCount} products with images`);
    
    return NextResponse.json({
      success: true,
      data: { updatedCount }
    });
  } catch (error) {
    console.error('Error updating product images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product images: ' + error.message },
      { status: 500 }
    );
  }
}