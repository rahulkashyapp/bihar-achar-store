'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Settings, Shield, Save, Eye, EyeOff, Smartphone } from 'lucide-react'

export default function AdminSettings() {
  const [gmailAddress, setGmailAddress] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  // UPI Settings
  const [upiId, setUpiId] = useState('')
  const [paymentInstructions, setPaymentInstructions] = useState('')

  useEffect(() => {
    // Load current settings
    loadSettings()
  }, [])

  const loadSettings = () => {
    const savedGmail = localStorage.getItem('adminGmailAddress') || 'rahulkashyap98017@gmail.com'
    setGmailAddress(savedGmail)
    
    // Load UPI settings
    const savedUpiSettings = localStorage.getItem('adminSettings')
    if (savedUpiSettings) {
      const settings = JSON.parse(savedUpiSettings)
      setUpiId(settings.upiId || 'rahulkashyap9798@ybl')
      setPaymentInstructions(settings.paymentInstructions || 'Please make the payment and upload the screenshot. We\'ll verify and process your order within 24 hours.')
    } else {
      setUpiId('rahulkashyap9798@ybl')
      setPaymentInstructions('Please make the payment and upload the screenshot. We\'ll verify and process your order within 24 hours.')
    }
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    setError('')
    setMessage('')

    // Verify admin password
    if (currentPassword !== 'BiharAchar@2025') {
      setError('Invalid admin password')
      setIsLoading(false)
      return
    }

    // Validate Gmail address
    if (!gmailAddress.endsWith('@gmail.com')) {
      setError('Only Gmail addresses are allowed')
      setIsLoading(false)
      return
    }

    // Validate UPI ID
    if (!upiId.includes('@')) {
      setError('Invalid UPI ID format')
      setIsLoading(false)
      return
    }

    try {
      // Save Gmail settings to localStorage
      localStorage.setItem('adminGmailAddress', gmailAddress)
      
      // Save UPI settings to localStorage
      const upiSettings = {
        upiId: upiId,
        paymentInstructions: paymentInstructions
      }
      localStorage.setItem('adminSettings', JSON.stringify(upiSettings))
      
      // Emit event for checkout page to update
      window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: upiSettings }))
      
      // Test OTP sending to new email
      const testResponse = await fetch('/api/send-otp-gmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: gmailAddress
        })
      })
      
      const testData = await testResponse.json()
      
      if (testData.success) {
        setMessage(`✅ Settings saved successfully! Test OTP sent to ${gmailAddress}\n✅ UPI ID updated to: ${upiId}`)
        if (testData.debug && testData.debug.otp) {
          setMessage(prev => prev + `\n\n🔐 Test OTP: ${testData.debug.otp}`)
        }
      } else {
        setError(`Settings saved but OTP test failed: ${testData.error}`)
      }
      
    } catch (error) {
      console.error('Error saving settings:', error)
      setError('Failed to save settings')
    }
    
    setIsLoading(false)
    setCurrentPassword('')
  }

  const handleTestOtpOnly = async () => {
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const testResponse = await fetch('/api/send-otp-gmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: gmailAddress
        })
      })
      
      const testData = await testResponse.json()
      
      if (testData.success) {
        setMessage(`✅ Test OTP sent to ${gmailAddress}`)
        if (testData.debug && testData.debug.otp) {
          setMessage(prev => prev + `\n\n🔐 Test OTP: ${testData.debug.otp}`)
        }
      } else {
        setError(`❌ OTP test failed: ${testData.error}`)
      }
      
    } catch (error) {
      console.error('Error testing OTP:', error)
      setError('Failed to test OTP')
    }
    
    setIsLoading(false)
  }

  const handleDebugGmailConfig = async () => {
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/admin/check-gmail-config')
      const data = await response.json()
      
      if (data.success) {
        const debugInfo = `
📧 Gmail Configuration Debug:

Local Storage:
- Exists: ${data.config.local.exists}
- Email: ${data.config.local.email}
- Has Password: ${data.config.local.hasPassword}
- Password Length: ${data.config.local.passwordLength}

Global Storage:
- Exists: ${data.config.global.exists}
- Email: ${data.config.global.email}
- Has Password: ${data.config.global.hasPassword}
- Password Length: ${data.config.global.passwordLength}

Environment:
- Email: ${data.config.environment.email}
- Has Password: ${data.config.environment.hasPassword}
- Password Length: ${data.config.environment.passwordLength}
- Is Demo: ${data.config.environment.isDemo}

Overall Status: ${data.isConfigured ? '✅ Configured' : '❌ Not Configured'}
        `
        setMessage(debugInfo.trim())
      } else {
        setError(`❌ Debug failed: ${data.error}`)
      }
    } catch (error) {
      console.error('Error debugging Gmail config:', error)
      setError('Failed to debug Gmail configuration')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Admin Settings
          </h1>
          <p className="text-gray-600 mt-2">Configure your admin panel settings</p>
        </div>

        <div className="grid gap-6">
          {/* UPI Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                UPI Payment Configuration
              </CardTitle>
              <CardDescription>
                Configure UPI payment settings for checkout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="upiId"
                    type="text"
                    placeholder="yourupi@ybl"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Customers will pay to this UPI ID
                </p>
              </div>

              <div>
                <Label htmlFor="paymentInstructions">Payment Instructions</Label>
                <textarea
                  id="paymentInstructions"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter payment instructions for customers"
                  value={paymentInstructions}
                  onChange={(e) => setPaymentInstructions(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  These instructions will be shown to customers during checkout
                </p>
              </div>
            </CardContent>
          </Card>

          {/* UPI Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                UPI Payment Configuration
              </CardTitle>
              <CardDescription>
                Configure UPI payment settings for checkout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  type="text"
                  placeholder="yourupi@ybl"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Customers will pay to this UPI ID
                </p>
              </div>

              <div>
                <Label htmlFor="paymentInstructions">Payment Instructions</Label>
                <textarea
                  id="paymentInstructions"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Enter payment instructions for customers"
                  value={paymentInstructions}
                  onChange={(e) => setPaymentInstructions(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Instructions shown to customers during UPI payment
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Gmail OTP Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Gmail OTP Configuration
              </CardTitle>
              <CardDescription>
                Configure which Gmail address receives OTP verification codes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {message && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700 whitespace-pre-line">
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="gmail">Gmail Address for OTP</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="gmail"
                    type="email"
                    placeholder="admin@gmail.com"
                    value={gmailAddress}
                    onChange={(e) => setGmailAddress(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  This Gmail will receive OTP codes for password reset
                </p>
              </div>

              <div>
                <Label htmlFor="password">Admin Password (to save changes)</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter admin password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                <p className="text-sm text-gray-500 mt-1">
                  Enter admin password to save settings
                </p>
              </div>

              <Button 
                onClick={handleSaveSettings} 
                className="w-full"
                disabled={isLoading || !gmailAddress || !currentPassword}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Settings & Test OTP'}
              </Button>

              {/* Additional Test Button */}
              <Button 
                onClick={handleTestOtpOnly} 
                variant="outline"
                className="w-full"
                disabled={isLoading || !gmailAddress}
              >
                <Mail className="w-4 h-4 mr-2" />
                {isLoading ? 'Testing...' : 'Test OTP Only'}
              </Button>

              {/* Debug Gmail Config Button */}
              <Button 
                onClick={handleDebugGmailConfig} 
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                <Settings className="w-4 h-4 mr-2" />
                {isLoading ? 'Checking...' : 'Debug Gmail Config'}
              </Button>
            </CardContent>
          </Card>

          {/* Current Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Current Configuration</CardTitle>
              <CardDescription>
                Your current admin panel settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Active Gmail:</span>
                  <span className="text-blue-600">{gmailAddress}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">UPI ID:</span>
                  <span className="text-purple-600">{upiId}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">OTP System:</span>
                  <span className="text-green-600">Active</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Gmail Service:</span>
                  <span className="text-orange-600">Development Mode</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
              <CardDescription>
                How to configure real Gmail sending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded">
                  <strong>Step 1:</strong> Enable 2-factor authentication on your Gmail
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <strong>Step 2:</strong> Create App Password: <a href="https://myaccount.google.com/apppasswords" target="_blank" className="text-blue-600 underline">https://myaccount.google.com/apppasswords</a>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <strong>Step 3:</strong> <Link href="/admin/gmail-setup" className="text-blue-600 underline">Configure App Password in Admin Panel</Link>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <strong>Step 4:</strong> Test Gmail sending and restart server
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}