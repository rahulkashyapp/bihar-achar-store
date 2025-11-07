import { NextRequest, NextResponse } from 'next/server';
import { gmailConfigManager } from '@/lib/gmail-config';

export async function POST(request: NextRequest) {
  try {
    const { email, appPassword } = await request.json();

    if (!email || !appPassword) {
      return NextResponse.json(
        { success: false, error: 'Email and App Password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Validate app password format (should be 16 characters without spaces)
    const cleanPassword = appPassword.replace(/\s/g, '');
    if (cleanPassword.length !== 16) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid App Password format. App Password should be 16 characters long (without spaces).' 
        },
        { status: 400 }
      );
    }

    // Store using the configuration manager
    gmailConfigManager.setConfig(email, cleanPassword);

    console.log('Gmail configuration saved successfully:', { 
      email, 
      appPassword: `${cleanPassword.substring(0, 4)}****${cleanPassword.substring(12)}` 
    });

    return NextResponse.json({
      success: true,
      message: 'Gmail configuration saved successfully! You can now send real OTP emails.'
    });

  } catch (error) {
    console.error('Save Gmail config error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save Gmail configuration' 
      },
      { status: 500 }
    );
  }
}