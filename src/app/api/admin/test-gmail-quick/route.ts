import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { gmailConfigManager } from '@/lib/gmail-config';

export async function POST(request: NextRequest) {
  try {
    const { appPassword, testEmail } = await request.json();

    if (!appPassword) {
      return NextResponse.json(
        { success: false, error: 'App Password is required' },
        { status: 400 }
      );
    }

    // Clean the app password (remove spaces)
    const cleanPassword = appPassword.replace(/\s/g, '');
    
    // Validate app password format
    if (cleanPassword.length !== 16) {
      return NextResponse.json(
        { success: false, error: 'Invalid App Password format. Should be 16 characters long.' },
        { status: 400 }
      );
    }

    // Get admin email from settings or use default
    const adminEmail = 'rahulkashyap98017@gmail.com';
    
    // Test the Gmail configuration
    try {
      console.log('Testing Gmail configuration...');
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: adminEmail,
          pass: cleanPassword,
        },
      });

      // Test email content
      const testEmailContent = {
        from: `Bihar Achar Store <${adminEmail}>`,
        to: testEmail || adminEmail,
        subject: '✅ Gmail Test Successful - Bihar Achar Store',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #dc2626, #ea580c); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">✅ Gmail Test Successful!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Gmail App Password is working perfectly</p>
            </div>
            
            <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #374151; margin-top: 0;">Test Details</h2>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <p style="margin: 5px 0;"><strong>📧 To:</strong> ${testEmail || adminEmail}</p>
                  <p style="margin: 5px 0;"><strong>🕐 Time:</strong> ${new Date().toLocaleString()}</p>
                  <p style="margin: 5px 0;"><strong>🔐 Status:</strong> <span style="color: #10b981;">Connected Successfully</span></p>
                </div>
                
                <div style="background: #ede9fe; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
                  <p style="margin: 0; color: #5b21b6;">
                    <strong>🎉 Congratulations!</strong><br>
                    Your Gmail App Password is correctly configured. 
                    The Bihar Achar Store can now send OTP emails to users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(testEmailContent);
      console.log('Test email sent successfully:', info.messageId);

      // If test was successful, save the configuration
      gmailConfigManager.setConfig(adminEmail, cleanPassword);

      return NextResponse.json({
        success: true,
        message: 'Gmail App Password is working! Test email sent successfully.',
        messageId: info.messageId,
        email: testEmail || adminEmail
      });

    } catch (emailError: any) {
      console.error('Gmail test error:', emailError);
      
      let errorMessage = 'Gmail App Password test failed';
      
      if (emailError.message.includes('535-5.7.8')) {
        errorMessage = '❌ Invalid App Password. Please check:\n1. 2FA is enabled on your Gmail\n2. App Password is generated correctly\n3. App Password is 16 characters long\n4. No extra spaces in the password';
      } else if (emailError.message.includes('ETIMEDOUT')) {
        errorMessage = '❌ Connection timeout. Please check your internet connection.';
      } else if (emailError.message.includes('ENOTFOUND')) {
        errorMessage = '❌ Network error. Please check your internet connection.';
      } else {
        errorMessage = `❌ Gmail error: ${emailError.message}`;
      }

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error in Gmail test:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to test Gmail configuration' },
      { status: 500 }
    );
  }
}