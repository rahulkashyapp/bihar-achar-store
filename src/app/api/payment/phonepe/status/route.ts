import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // In a real implementation, you would check the transaction status with PhonePe API
    // For demo purposes, we'll simulate a successful payment after some delay
    const transaction = {
      id: transactionId,
      status: 'SUCCESS', // or 'FAILED' or 'PENDING'
      amount: 0,
      createdAt: new Date().toISOString(),
    };

    // Simulate payment success (in real app, check with PhonePe)
    // For demo, we'll randomly return success or pending
    const isSuccessful = Math.random() > 0.3; // 70% success rate for demo
    
    return NextResponse.json({
      success: true,
      status: isSuccessful ? 'SUCCESS' : 'PENDING',
      transactionId,
      message: isSuccessful ? 'Payment completed successfully' : 'Payment is being processed',
    });

  } catch (error) {
    console.error('Error checking PhonePe status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}