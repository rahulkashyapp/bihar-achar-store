import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { gmailConfigManager } from '@/lib/gmail-config';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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
        { error: 'Only authorized email can reset password' },
        { status: 403 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP (in production, use Redis or database)
    const otpData = {
      email,
      otp,
      timestamp: Date.now(),
      expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes
    };
    
    global.otpStore = global.otpStore || new Map();
    global.otpStore.set(email, otpData);
    
    console.log('🔐 OTP Generated for', email, ':', otp);
    
    // Create email content
    const emailSubject = '🔐 Password Reset OTP - Bihar Achar Store';
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #dc2626; }
        .logo { font-size: 2.5em; margin-bottom: 10px; }
        .title { color: #dc2626; font-size: 24px; font-weight: bold; margin: 0; }
        .otp-container { background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
        .otp-code { font-size: 36px; font-weight: bold; letter-spacing: 8px; background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 5px; display: inline-block; margin: 10px 0; font-family: 'Courier New', monospace; }
        .info-section { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 5px 5px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        .security-note { background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 0 5px 5px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🥭</div>
            <h1 class="title">Bihar Achar Store</h1>
            <p style="margin: 5px 0; color: #6b7280;">Admin Password Reset Request</p>
        </div>

        <div class="otp-container">
            <h2 style="margin: 0 0 10px 0; font-size: 20px;">🔑 Your Password Reset OTP</h2>
            <div class="otp-code">${otp}</div>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">⏰ This code expires in 10 minutes</p>
        </div>

        <div class="security-note">
            <strong>🔒 Security Notice:</strong>
            <p style="margin: 5px 0;">If you didn't request this password reset, please ignore this email. Your account remains secure.</p>
        </div>

        <div class="info-section">
            <strong>📧 Next Steps:</strong>
            <ol style="margin: 10px 0; padding-left: 20px;">
                <li>Go to the admin login page</li>
                <li>Enter this 6-digit OTP: <strong>${otp}</strong></li>
                <li>Create a new strong password</li>
                <li>Keep your password secure and private</li>
            </ol>
        </div>

        <div class="footer">
            <p>&copy; 2024 Bihar Achar Store. All rights reserved.</p>
            <p style="margin: 5px 0; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
    `;

    // Try to send using Gmail (you'll need to set up Gmail App Password)
    try {
      // Get Gmail configuration using the configuration manager
      const gmailConfig = gmailConfigManager.getConfig();
      
      if (!gmailConfig || !gmailConfig.appPassword) {
        throw new Error('Gmail App Password not configured');
      }
      
      // Check if using demo password
      if (gmailConfig.appPassword === 'demopasswordfortesting16') {
        console.log('🔄 Using demo password - falling back to development mode');
        throw new Error('USING_DEMO_PASSWORD');
      }
      
      console.log('Using Gmail config from manager:', { 
        email: gmailConfig.email, 
        hasPassword: !!gmailConfig.appPassword,
        passwordLength: gmailConfig.appPassword.length 
      });
      
      // Create a transporter using Gmail
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailConfig.email, // Use email from config
          pass: gmailConfig.appPassword // App Password from config
        }
      });

      const mailOptions = {
        from: `Bihar Achar Store <${gmailConfig.email}>`,
        to: email,
        subject: emailSubject,
        html: emailBody
      };

      await transporter.sendMail(mailOptions);
      
      console.log('✅ Email sent successfully to:', email);
      
      return NextResponse.json({
        success: true,
        message: 'OTP sent to your Gmail! Check your inbox.',
        email: email,
        note: 'Please check your Gmail inbox and spam folder for the OTP'
      });
      
    } catch (emailError: any) {
      console.error('Gmail service error:', emailError);
      
      // Handle demo password case
      if (emailError.message === 'USING_DEMO_PASSWORD') {
        console.log('🔄 Demo password detected - showing setup instructions');
        return NextResponse.json({
          success: true,
          message: 'OTP generated! (Demo mode - Gmail not configured)',
          email: email,
          note: 'Gmail App Password needs to be configured for real email sending',
          debug: {
            otp: otp,
            setupInstructions: 'Go to /admin/gmail-quick-setup to configure Gmail App Password in 2 minutes',
            quickSetupLink: '/admin/gmail-quick-setup'
          }
        });
      }
      
      console.log('🔄 Falling back to development mode...');
      
      // Fallback for development
      return NextResponse.json({
        success: true,
        message: 'OTP generated! (Gmail service not configured)',
        email: email,
        note: 'Please check console for OTP (development mode)',
        debug: {
          otp: otp,
          setupInstructions: 'To enable real Gmail: 1) Enable 2FA on Gmail 2) Create App Password 3) Set up in Gmail Setup page',
          quickSetupLink: '/admin/gmail-quick-setup'
        }
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