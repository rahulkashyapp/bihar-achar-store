import { NextRequest, NextResponse } from 'next/server';
import { gmailConfigManager } from '@/lib/gmail-config';

export async function GET() {
  try {
    // Get configuration status from manager
    const status = gmailConfigManager.getStatus();
    
    return NextResponse.json({
      success: true,
      config: status,
      isConfigured: gmailConfigManager.isConfigured(),
      note: 'This shows the current Gmail configuration status'
    });
    
  } catch (error) {
    console.error('Error checking Gmail config:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check Gmail configuration' 
      },
      { status: 500 }
    );
  }
}