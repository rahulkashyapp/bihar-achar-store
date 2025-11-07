import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Only allow configured admin emails
    const AUTHORIZED_EMAILS = [
      'rahulkashyap98017@gmail.com',
      'rahulkashyapp98017@gmail.com'
    ];
    
    if (!AUTHORIZED_EMAILS.includes(email)) {
      return NextResponse.json(
        { error: 'Unauthorized email address' },
        { status: 403 }
      );
    }

    // Get stored OTP data
    global.otpStore = global.otpStore || new Map();
    const otpData = global.otpStore.get(email);

    if (!otpData) {
      return NextResponse.json(
        { error: 'No OTP found for this email. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    if (Date.now() > otpData.expiresAt) {
      global.otpStore.delete(email);
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Verify OTP
    if (otpData.otp === otp) {
      // Clear the OTP after successful verification
      global.otpStore.delete(email);
      
      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP. Please try again.' },
      { status: 500 }
    );
  }
}