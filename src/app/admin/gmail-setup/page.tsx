'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Eye, 
  EyeOff,
  Key,
  Lock,
  Smartphone
} from 'lucide-react'

export default function GmailSetup() {
  const [appPassword, setAppPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [testResult, setTestResult] = useState('')
  const [testEmail, setTestEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [configStatus, setConfigStatus] = useState(null)

  // Load admin email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('adminGmailAddress') || 'rahulkashyap98017@gmail.com'
    setAdminEmail(savedEmail)
    setTestEmail(savedEmail) // Pre-fill test email with admin email
    
    // Check current configuration status
    checkConfigStatus()
  }, [])

  const checkConfigStatus = async () => {
    try {
      const response = await fetch('/api/admin/check-gmail-config')
      const data = await response.json()
      setConfigStatus(data)
    } catch (error) {
      console.error('Failed to check config status:', error)
    }
  }

  const handleSavePassword = async () => {
    if (!appPassword) {
      setTestResult('❌ Please enter the App Password')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/save-gmail-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail, // Use admin email from settings
          appPassword: appPassword.replace(/\s/g, '') // Remove spaces
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setIsSaved(true)
        setTestResult('✅ App Password saved successfully!')
        localStorage.setItem('gmailAppPassword', appPassword)
        // Refresh config status after saving
        checkConfigStatus()
      } else {
        setTestResult(`❌ Failed to save: ${data.error}`)
      }
    } catch (error) {
      setTestResult('❌ Failed to save App Password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestGmail = async () => {
    const savedPassword = localStorage.getItem('gmailAppPassword')
    if (!savedPassword) {
      setTestResult('❌ Please save App Password first')
      return
    }

    if (!testEmail) {
      setTestResult('❌ Please enter test email address')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/test-gmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setTestResult('✅ Test email sent successfully! Check your inbox.')
      } else {
        setTestResult(`❌ Gmail test failed: ${data.error}`)
      }
    } catch (error) {
      setTestResult('❌ Failed to test Gmail configuration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-8 h-8" />
            Gmail App Password Setup
          </h1>
          <p className="text-gray-600 mt-2">Configure Gmail App Password for real OTP sending</p>
        </div>

        <div className="grid gap-6">
          {/* Step by Step Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Step-by-Step Setup Guide
              </CardTitle>
              <CardDescription>
                Follow these steps to enable real Gmail OTP sending
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-100 text-blue-800 mt-1">1</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">Enable 2-Factor Authentication</h3>
                    <p className="text-blue-700 text-sm mt-1">
                      Go to your Google Account settings and enable 2FA on your Gmail account
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => window.open('https://myaccount.google.com/security', '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open Google Security
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-100 text-blue-800 mt-1">2</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">Generate App Password</h3>
                    <p className="text-blue-700 text-sm mt-1">
                      Create a 16-character App Password specifically for this application
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => window.open('https://myaccount.google.com/apppasswords', '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Generate App Password
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-100 text-blue-800 mt-1">3</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">Configure App Settings</h3>
                    <p className="text-blue-700 text-sm mt-1">
                      Select "Mail" for app type and "Other (Custom name)" for device
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-mono">App: Mail</p>
                      <p className="text-sm font-mono">Device: Bihar Achar Store</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-100 text-blue-800 mt-1">4</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">Copy App Password</h3>
                    <p className="text-blue-700 text-sm mt-1">
                      Copy the 16-character password (without spaces) and enter it below
                    </p>
                    <div className="mt-2 p-3 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <strong>Example:</strong> abcd efgh ijkl mnop
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Configuration Status
              </CardTitle>
              <CardDescription>
                Current Gmail configuration status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {configStatus ? (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium">Configuration Status:</p>
                    <p className="text-xs text-gray-600">
                      {configStatus.isConfigured ? 
                        `✅ Configured for ${configStatus.config.local.email || configStatus.config.global.email}` : 
                        '❌ Not configured'
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium">Local Storage:</p>
                    <p className="text-xs text-gray-600">
                      {configStatus.config.local.exists ? 
                        `✅ ${configStatus.config.local.email}` : 
                        '❌ Not configured'
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium">Global Storage:</p>
                    <p className="text-xs text-gray-600">
                      {configStatus.config.global.exists ? 
                        `✅ ${configStatus.config.global.email}` : 
                        '❌ Not configured'
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium">Environment:</p>
                    <p className="text-xs text-gray-600">
                      {configStatus.config.environment.hasPassword && !configStatus.config.environment.isDemo ? 
                        '✅ Configured' : 
                        '❌ Not configured or using demo'
                      }
                    </p>
                  </div>
                  <Button 
                    onClick={checkConfigStatus} 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    Refresh Status
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Loading configuration status...</p>
              )}
            </CardContent>
          </Card>

          {/* App Password Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Enter App Password
              </CardTitle>
              <CardDescription>
                Enter your 16-character Gmail App Password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Admin Email:</strong> {adminEmail}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  This email will be used to send OTPs
                </p>
              </div>
              
              <div>
                <Label htmlFor="app-password">Gmail App Password</Label>
                <div className="relative">
                  <Input
                    id="app-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="abcd efgh ijkl mnop"
                    value={appPassword}
                    onChange={(e) => setAppPassword(e.target.value)}
                    className="pr-20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
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
                  16-character password from Google App Passwords
                </p>
              </div>

              <Button 
                onClick={handleSavePassword} 
                className="w-full"
                disabled={!appPassword || isSaved || isLoading}
              >
                <Lock className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : (isSaved ? 'App Password Saved' : 'Save App Password')}
              </Button>

              {testResult && (
                <Alert className={testResult.includes('✅') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  <AlertDescription className={testResult.includes('✅') ? 'text-green-700' : 'text-red-700'}>
                    {testResult}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Test Gmail Configuration
              </CardTitle>
              <CardDescription>
                Test if your Gmail setup is working correctly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="test-email">Test Email Address</Label>
                <Input
                  id="test-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the email where you want to receive the test email
                </p>
              </div>
              
              <Button 
                onClick={handleTestGmail} 
                className="w-full"
                variant="outline"
                disabled={isLoading || !isSaved}
              >
                <Mail className="w-4 h-4 mr-2" />
                {isLoading ? 'Sending Test Email...' : 'Send Test Email'}
              </Button>
              <p className="text-sm text-gray-500">
                This will send a test email to verify your Gmail configuration
              </p>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p>App Password is different from your regular Gmail password</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p>Keep your App Password secure and don't share it</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p>2-Factor Authentication must be enabled on your Gmail account</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p>Restart the server after saving the App Password</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}