import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { gmailConfigManager } from '@/lib/gmail-config';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get Gmail configuration using the configuration manager
    const gmailConfig = gmailConfigManager.getConfig();
    
    if (!gmailConfig || !gmailConfig.appPassword) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gmail not configured. Please set up App Password first.' 
        },
        { status: 400 }
      );
    }

    // Create test email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailConfig.email,
        pass: gmailConfig.appPassword,
      },
    });

    // Send test email
    const info = await transporter.sendMail({
      from: gmailConfig.email,
      to: email,
      subject: 'PhonePe Payment Gateway - Gmail Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6B46C1 0%, #9333EA 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">✅ Gmail Test Successful!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Gmail configuration is working perfectly</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h2 style="color: #374151; margin-top: 0;">Test Details</h2>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="margin: 5px 0;"><strong>📧 To:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>🕐 Time:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 5px 0;"><strong>🔐 Status:</strong> <span style="color: #10b981;">Connected</span></p>
              </div>
              
              <div style="background: #ede9fe; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
                <p style="margin: 0; color: #5b21b6;">
                  <strong>🎉 Congratulations!</strong><br>
                  Your Gmail App Password is correctly configured. 
                  The PhonePe Payment Gateway can now send OTP emails to users.
                </p>
              </div>
            </div>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">© 2025 PhonePe Payment Gateway. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log('Test email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Gmail test error:', error);
    
    let errorMessage = 'Failed to send test email';
    
    if (error instanceof Error) {
      if (error.message.includes('535-5.7.8')) {
        errorMessage = 'Invalid App Password. Please check your Gmail App Password and try again.';
      } else if (error.message.includes('ETIMEDOUT')) {
        errorMessage = 'Connection timeout. Please check your internet connection.';
      } else if (error.message.includes('ENOTFOUND')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}