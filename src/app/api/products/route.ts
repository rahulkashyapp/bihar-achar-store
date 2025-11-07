import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let whereClause: any = {};
    
    if (category) {
      whereClause.category = category;
    }
    
    if (featured === 'true') {
      whereClause.featured = true;
    }

    const products = await db.product.findMany({
      where: whereClause,
      include: {
        categoryRel: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit ? parseInt(limit) : undefined
    });

    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if product with this ID already exists
    if (body.id) {
      const existingProduct = await db.product.findUnique({
        where: { id: body.id }
      });
      
      if (existingProduct) {
        return NextResponse.json({
          success: true,
          data: existingProduct
        });
      }
    }
    
    const product = await db.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        weight: body.weight,
        category: body.category,
        imageUrl: body.imageUrl,
        ingredients: body.ingredients,
        shelfLife: body.shelfLife,
        stock: body.stock || 0,
        featured: body.featured || false,
        categoryId: body.categoryId
      }
    });

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}