'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Lock, ArrowLeft, Eye, EyeOff, Shield, Settings, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [step, setStep] = useState<'login' | 'forgot-otp' | 'new-password'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Get configured Gmail address
  const getAdminGmail = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminGmailAddress') || 'rahulkashyap98017@gmail.com'
    }
    return 'rahulkashyap98017@gmail.com'
  }

  const ADMIN_EMAIL = getAdminGmail()
  const ADMIN_PASSWORD = 'BiharAchar@2025'

  const handleLogin = async () => {
    setIsLoading(true)
    setError('')

    if (email !== ADMIN_EMAIL) {
      setError('Access denied. Only rahulkashyapp98017@gmail.com can access')
      setIsLoading(false)
      return
    }

    // Verify password using API
    try {
      const response = await fetch('/api/admin/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      
      const data = await response.json()
      
      if (!data.success) {
        setError('Invalid password. Try "Forgot Password" if you remember email.')
        setIsLoading(false)
        return
      }
      
    } catch (error) {
      console.error('Error verifying password:', error)
      setError('Failed to verify password. Please try again.')
      setIsLoading(false)
      return
    }

    // Store admin session
    localStorage.setItem('adminAuth', 'true')
    localStorage.setItem('adminLoginTime', Date.now().toString())
    window.location.href = '/admin/dashboard'
  }

  const handleForgotPassword = async () => {
    setError('')
    setIsLoading(true)
    
    const adminGmail = getAdminGmail()
    
    try {
      const response = await fetch('/api/send-otp-gmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminGmail
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        let message = `✅ ${data.message}\n\n📧 Email: ${data.email}\n\n${data.note}`
        
        // Show OTP in development mode or if debug info is available
        if (data.debug && data.debug.otp) {
          message += `\n\n🔐 DEVELOPMENT MODE - Your OTP is: ${data.debug.otp}`
        }
        
        // Show setup instructions if available
        if (data.debug && data.debug.setupInstructions) {
          message += `\n\n💡 ${data.debug.setupInstructions}`
        }
        
        alert(message)
        setStep('forgot-otp')
      } else {
        setError(data.error || 'Failed to send OTP')
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
      setError('Failed to send OTP. Please try again.')
    }
    
    setIsLoading(false)
  }

  const handleVerifyForgotOTP = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: getAdminGmail(),
          otp: otp
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTimeout(() => {
          setStep('new-password')
          setIsLoading(false)
        }, 500)
      } else {
        setError(data.error || 'Invalid OTP. Please try again.')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      setError('Failed to verify OTP. Please try again.')
      setIsLoading(false)
    }
  }

  const handleSetNewPassword = async () => {
    setIsLoading(true)
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      setIsLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: getAdminGmail(),
          newPassword: newPassword
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert('Password updated successfully! Please login with your new password.')
        setStep('login')
        setEmail('')
        setPassword('')
        setOtp('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setError(data.error || 'Failed to update password')
      }
    } catch (error) {
      console.error('Error updating password:', error)
      setError('Failed to update password. Please try again.')
    }
    
    setIsLoading(false)
  }

  const handleBackToLogin = () => {
    setStep('login')
    setEmail('')
    setPassword('')
    setOtp('')
    setNewPassword('')
    setConfirmPassword('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {step === 'forgot-otp' || step === 'new-password' ? 'Reset Password' : 'Admin Login'}
            </CardTitle>
            <CardDescription>
              {step === 'login' && 'Enter your admin credentials'}
              {step === 'forgot-otp' && 'Enter the OTP sent to your email'}
              {step === 'new-password' && 'Set your new password'}
            </CardDescription>
          </CardHeader>
          
          {/* Gmail Setup Status */}
          <div className="px-6 pb-4">
            <Alert className="border-blue-200 bg-blue-50">
              <Settings className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700 text-sm">
                <div className="flex items-center justify-between">
                  <span>
                    <strong>Gmail OTP Status:</strong> Demo Mode Active
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = '/admin/gmail-quick-setup'}
                    className="ml-2 text-xs h-7"
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Setup Gmail
                  </Button>
                </div>
                <p className="text-xs mt-1">
                  Configure Gmail App Password to send real OTP emails
                </p>
              </AlertDescription>
            </Alert>
          </div>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {step === 'login' && (
              <>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="rahulkashyapp98017@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={handleLogin} 
                  className="w-full"
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? 'Logging in...' : 'Login to Admin'}
                </Button>

                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={handleForgotPassword}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Forgot Password?
                  </Button>
                </div>
              </>
            )}

            {step === 'forgot-otp' && (
              <>
                <div>
                  <Label htmlFor="forgot-otp">One-Time Password</Label>
                  <Input
                    id="forgot-otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    OTP sent to {ADMIN_EMAIL}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handleBackToLogin}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleVerifyForgotOTP} 
                    className="flex-1"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                </div>
              </>
            )}

            {step === 'new-password' && (
              <>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSetNewPassword} 
                  className="w-full"
                  disabled={isLoading || !newPassword || !confirmPassword}
                >
                  {isLoading ? 'Setting Password...' : 'Set New Password'}
                </Button>
              </>
            )}

            {step === 'login' && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Store
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Secure admin access - Only authorized email allowed
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Secure admin access with OTP verification
          </p>
        </div>
      </div>
    </div>
  )
}