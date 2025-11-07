import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email and new password are required' },
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

    // Validate new password
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Store the new password in global variable (in production, use database)
    global.adminPasswords = global.adminPasswords || new Map();
    global.adminPasswords.set(email, {
      password: newPassword,
      updatedAt: new Date().toISOString()
    });

    console.log('Password updated successfully for:', email);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

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
        { error: 'Unauthorized email address' },
        { status: 403 }
      );
    }

    // Get current password
    let currentPassword = null;
    
    // First check if password is in global storage
    if (global.adminPasswords && global.adminPasswords.has(email)) {
      const passwordData = global.adminPasswords.get(email);
      currentPassword = passwordData.password;
    }

    // Fallback to default password
    if (!currentPassword && (email === 'rahulkashyap98017@gmail.com' || email === 'rahulkashyapp98017@gmail.com')) {
      currentPassword = 'BiharAchar@2025';
    }

    if (!currentPassword) {
      return NextResponse.json(
        { error: 'Password not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      hasCustomPassword: global.adminPasswords && global.adminPasswords.has(email),
      passwordUpdatedAt: global.adminPasswords && global.adminPasswords.has(email) 
        ? global.adminPasswords.get(email).updatedAt 
        : null
    });

  } catch (error) {
    console.error('Error getting password:', error);
    return NextResponse.json(
      { error: 'Failed to get password' },
      { status: 500 }
    );
  }
}