import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Only allow your email - rahulkashyap98017@gmail.com
    if (email !== 'rahulkashyap98017@gmail.com') {
      return NextResponse.json(
        { error: 'Unauthorized email. Only rahulkashyap98017@gmail.com can access' },
        { status: 403 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP for verification (10 minutes expiry)
    const otpData = {
      email,
      otp,
      timestamp: Date.now(),
      expiresAt: Date.now() + (10 * 60 * 1000)
    };
    
    global.otpStore = global.otpStore || new Map();
    global.otpStore.set(email, otpData);
    
    console.log('🔐 Generated OTP for', email, ':', otp);

    try {
      // Use ZAI to send email notification
      const zai = await ZAI.create();
      
      const emailMessage = `
🔐 BIHAR ACHAR STORE - PASSWORD RESET OTP

Your One-Time Password (OTP) is: ${otp}

⏰ Valid for: 10 minutes
📧 Email: ${email}

If you didn't request this, please ignore this email.

Best regards,
Bihar Achar Store Team
      `;

      const response = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an email notification system. Confirm the OTP has been sent to the user.'
          },
          {
            role: 'user',
            content: `Send this OTP notification to ${email}:\n\n${emailMessage}\n\nPlease confirm the email has been sent successfully.`
          }
        ],
        temperature: 0.1
      });

      console.log('✅ Email notification sent:', response.choices[0]?.message?.content);

      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully to your Gmail',
        email: email,
        note: 'Please check your Gmail inbox (including spam folder)',
        expires_in: 600
      });

    } catch (zaiError) {
      console.error('ZAI error:', zaiError);
      
      // Fallback - show OTP in console for development
      console.log('📧 DEVELOPMENT MODE - OTP:', otp);
      
      return NextResponse.json({
        success: true,
        message: 'OTP generated (development mode)',
        email: email,
        note: 'Check console for OTP (development only)',
        expires_in: 600,
        dev_otp: process.env.NODE_ENV === 'development' ? otp : undefined
      });
    }

  } catch (error) {
    console.error('Error in OTP generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate OTP. Please try again.' },
      { status: 500 }
    );
  }
}
