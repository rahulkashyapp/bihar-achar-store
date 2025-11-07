import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let whereClause: any = {};
    
    if (status) {
      whereClause.status = status;
    }

    const orders = await db.order.findMany({
      where: whereClause,
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit ? parseInt(limit) : undefined
    });

    return NextResponse.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const order = await db.order.create({
      data: {
        customerName: body.customerInfo.name,
        customerEmail: body.customerInfo.email,
        customerPhone: body.customerInfo.phone,
        customerAddress: body.customerInfo.address,
        customerCity: body.customerInfo.city,
        customerState: body.customerInfo.state,
        customerPincode: body.customerInfo.pincode,
        totalAmount: body.totalAmount,
        paymentStatus: body.paymentStatus || 'pending',
        paymentScreenshot: body.paymentScreenshot,
        status: body.status || 'pending',
        notes: body.customerInfo.notes,
        userId: body.userId,
        orderItems: {
          create: body.items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}