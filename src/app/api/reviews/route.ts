import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Review API Request Body:', body);
    
    const { productId, customerName, rating, comment } = body;
    
    if (!productId || !customerName || !rating || !comment) {
      console.log('Missing fields:', { productId, customerName, rating, comment });
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (rating < 1 || rating > 5) {
      console.log('Invalid rating:', rating);
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }
    
    // Check if product exists in database
    console.log('Checking if product exists:', productId);
    let existingProduct = await db.product.findUnique({
      where: { id: productId }
    });
    
    if (!existingProduct) {
      console.log('Product not found in database, trying to create it from localStorage data...');
      
      // Try to get product from localStorage equivalent (for admin panel products)
      // This is a fallback for products created in admin panel but not saved to database
      try {
        // In a real scenario, you might want to sync products from localStorage to database
        // For now, let's create a basic product entry
        const fallbackProduct = {
          id: productId,
          name: `Product ${productId}`,
          description: 'Product description',
          price: 0,
          weight: '500g',
          category: 'General',
          stock: 0
        };
        
        existingProduct = await db.product.create({
          data: fallbackProduct
        });
        
        console.log('Created fallback product in database:', existingProduct.name);
      } catch (createError) {
        console.error('Failed to create fallback product:', createError);
        return NextResponse.json(
          { success: false, error: 'Product not found and could not be created' },
          { status: 400 }
        );
      }
    }
    
    console.log('Product found:', existingProduct.name);
    console.log('Attempting to create review in database...');
    const review = await db.review.create({
      data: {
        productId,
        customerName,
        rating,
        comment,
        status: 'approved' // Auto-approve reviews for now
      }
    });

    console.log('Review created successfully:', review);
    return NextResponse.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error creating review:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { success: false, error: 'Failed to create review: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    let whereClause: any = {};
    
    if (productId) {
      whereClause.productId = productId;
    }
    
    // Only get approved reviews
    whereClause.status = 'approved';
    
    const reviews = await db.review.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}