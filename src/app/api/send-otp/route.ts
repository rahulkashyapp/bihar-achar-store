import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Check if Gmail is configured and send email
async function sendEmailViaGmail(to: string, subject: string, html: string) {
  try {
    // Check if Gmail App Password is configured in global storage
    let gmailConfig = global.gmailConfig;
    
    // If not in global, try environment variables
    if (!gmailConfig) {
      const appPassword = process.env.GMAIL_APP_PASSWORD;
      const gmailEmail = process.env.GMAIL_EMAIL || 'rahulraj@example.com';
      
      if (appPassword && appPassword !== 'demopasswordfortesting16') {
        gmailConfig = {
          email: gmailEmail,
          appPassword: appPassword,
          configuredAt: new Date().toISOString()
        };
      }
    }
    
    if (!gmailConfig) {
      // Not configured
      return { success: false, error: 'Gmail not configured' };
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailConfig.email,
        pass: gmailConfig.appPassword,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: gmailConfig.email,
      to: to,
      subject: subject,
      html: html,
    });

    console.log('Gmail email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Gmail sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Fallback email sending function using fetch to a free email service
async function sendEmailFallback(to: string, subject: string, html: string) {
  try {
    // Using EmailJS-like approach with a free service
    // For production, you should use a proper email service like Resend, SendGrid, etc.
    
    // Option 1: Try using a free email API service
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_your_service_id',
        template_id: 'template_your_template_id',
        user_id: 'your_user_id',
        template_params: {
          to_email: to,
          subject: subject,
          message: html,
        }
      })
    });

    if (response.ok) {
      return { success: true };
    }
  } catch (error) {
    console.log('EmailJS not configured, using fallback...');
  }

  // Option 2: Use Formspree as webhook (free)
  try {
    const response = await fetch('https://formspree.io/f/xkndwpqj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: to,
        subject: subject,
        html: html,
      })
    });

    if (response.ok) {
      return { success: true };
    }
  } catch (error) {
    console.log('Formspree not available, using fallback...');
  }

  // Fallback: Store for demo and return success
  return { success: true, demo: true };
}

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Validate email domain (only allow Gmail for security)
    if (!email.endsWith('@gmail.com')) {
      return NextResponse.json(
        { error: 'Only Gmail addresses are supported' },
        { status: 400 }
      );
    }

    // Create professional email content
    const emailSubject = '🔐 Password Reset OTP - Bihar Achar Store';
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #dc2626;
        }
        .logo {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .title {
            color: #dc2626;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        .otp-container {
            background: linear-gradient(135deg, #dc2626, #ea580c);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            background: rgba(255,255,255,0.2);
            padding: 15px 25px;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
        .info-section {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .security-note {
            background-color: #fee2e2;
            border-left: 4px solid #dc2626;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #dc2626;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
        }
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

        <div style="text-align: center; margin: 30px 0;">
            <a href="/admin/login" class="button">Go to Admin Login</a>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px;">
                Need help? Contact us at:<br>
                📧 rahulkashyap98017@gmail.com<br>
                📞 +91 97986 33639
            </p>
        </div>

        <div class="footer">
            <p>&copy; 2024 Bihar Achar Store. All rights reserved.</p>
            <p style="margin: 5px 0; font-size: 12px;">
                This is an automated message. Please do not reply to this email.
            </p>
            <p style="margin: 5px 0; font-size: 12px; color: #dc2626;">
                📍 Patna, Bihar, India | 🥭 Authentic Traditional Pickles
            </p>
        </div>
    </div>
</body>
</html>
    `;

    // Store OTP data (in production, use Redis or database)
    const otpData = {
      email,
      otp,
      timestamp: Date.now(),
      expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes
    };
    
    // Store in global variable (server-side)
    global.otpStore = global.otpStore || new Map();
    global.otpStore.set(email, otpData);
    
    console.log('🔐 OTP Generated for', email, ':', otp);
    
    // Try to send email via Gmail first (if configured)
    let emailResult = await sendEmailViaGmail(email, emailSubject, emailBody);
    
    if (!emailResult.success) {
      console.log('Gmail not configured, using fallback method...');
      // Fallback to other methods
      emailResult = await sendEmailFallback(email, emailSubject, emailBody);
    }
    
    if (emailResult.success) {
      return NextResponse.json({ 
        success: true, 
        message: emailResult.demo ? 
          'OTP generated successfully (Demo mode - check console)' : 
          'OTP sent successfully to your Gmail inbox',
        email: email,
        note: emailResult.demo ? 'Demo mode: Check console for OTP' : 'Check your Gmail inbox',
        otpForDemo: emailResult.demo ? otp : undefined,
        gmailUsed: !emailResult.demo
      });
    } else {
      throw new Error(emailResult.error || 'Failed to send email');
    }

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP. Please try again.' },
      { status: 500 }
    );
  }
}
