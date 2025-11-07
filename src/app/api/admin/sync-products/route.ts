import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Sync Products API Request Body:', body);
    
    const { products } = body;
    
    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { success: false, error: 'Products array is required' },
        { status: 400 }
      );
    }
    
    let syncedCount = 0;
    let updatedCount = 0;
    
    for (const product of products) {
      try {
        // Check if product already exists
        const existingProduct = await db.product.findUnique({
          where: { id: product.id }
        });
        
        if (existingProduct) {
          // Update existing product
          await db.product.update({
            where: { id: product.id },
            data: {
              name: product.name,
              description: product.description,
              price: product.price,
              weight: product.weight || '500g',
              category: product.category,
              stock: product.stock || 0,
              imageUrl: product.images?.[0] || product.image || product.imageUrl,
              images: product.images && product.images.length > 0 ? JSON.stringify(product.images) : null,
              ingredients: product.ingredients,
              shelfLife: product.shelfLife,
              featured: product.featured || false,
              updatedAt: new Date()
            }
          });
          updatedCount++;
        } else {
          // Create new product
          await db.product.create({
            data: {
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              weight: product.weight || '500g',
              category: product.category,
              stock: product.stock || 0,
              imageUrl: product.images?.[0] || product.image || product.imageUrl,
              images: product.images && product.images.length > 0 ? JSON.stringify(product.images) : null,
              ingredients: product.ingredients,
              shelfLife: product.shelfLife,
              featured: product.featured || false,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          });
          syncedCount++;
        }
        
        console.log(`Processed product: ${product.name} (${product.id})`);
      } catch (productError) {
        console.error(`Error processing product ${product.id}:`, productError);
        // Continue with other products even if one fails
      }
    }
    
    console.log(`Sync completed: ${syncedCount} new, ${updatedCount} updated`);
    
    return NextResponse.json({
      success: true,
      data: {
        syncedCount,
        updatedCount,
        totalProcessed: products.length
      }
    });
  } catch (error) {
    console.error('Error syncing products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync products: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching synced products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}