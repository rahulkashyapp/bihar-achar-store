import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
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

    // Verify password
    if (password === currentPassword) {
      return NextResponse.json({
        success: true,
        message: 'Password verified successfully',
        hasCustomPassword: global.adminPasswords && global.adminPasswords.has(email)
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json(
      { error: 'Failed to verify password' },
      { status: 500 }
    );
  }
}