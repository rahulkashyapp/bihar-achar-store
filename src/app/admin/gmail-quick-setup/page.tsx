'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Key, CheckCircle, AlertCircle, ExternalLink, Eye, EyeOff } from 'lucide-react'

export default function GmailQuickSetup() {
  const [appPassword, setAppPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [testEmail, setTestEmail] = useState('rahulkashyap98017@gmail.com')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleTestAndSave = async () => {
    setIsLoading(true)
    setResult('')
    setIsSuccess(false)

    try {
      const response = await fetch('/api/admin/test-gmail-quick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appPassword: appPassword,
          testEmail: testEmail
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setResult(`✅ ${data.message}\n\n📧 Test email sent to: ${data.email}\n🔐 Gmail App Password has been saved and is now active!`)
        setIsSuccess(true)
        setAppPassword('') // Clear password for security
      } else {
        setResult(`❌ ${data.error}`)
        setIsSuccess(false)
      }
    } catch (error) {
      console.error('Error testing Gmail:', error)
      setResult('❌ Failed to test Gmail configuration')
      setIsSuccess(false)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-8 h-8 text-red-600" />
            Gmail Quick Setup
          </h1>
          <p className="text-gray-600 mt-2">Set up Gmail App Password in 2 minutes</p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Enable 2FA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Enable 2-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  First, enable 2FA on your Gmail account:
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://myaccount.google.com/security', '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Open Google Security Settings
                </Button>
                <p className="text-xs text-gray-500">
                  🔒 This is required for App Passwords to work
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Generate App Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Generate App Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Create a 16-character App Password:
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://myaccount.google.com/apppasswords', '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Generate App Password
                </Button>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-xs text-yellow-800">
                    <strong>Settings:</strong><br/>
                    • App: <strong>Mail</strong><br/>
                    • Device: <strong>Bihar Achar Store</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Test and Save */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Test and Save App Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="app-password">16-Character App Password</Label>
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
                <p className="text-xs text-gray-500 mt-1">
                  Copy the 16-character password from Google App Passwords
                </p>
              </div>

              <div>
                <Label htmlFor="test-email">Test Email (Optional)</Label>
                <Input
                  id="test-email"
                  type="email"
                  placeholder="Where to send test email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave default to send test to your admin email
                </p>
              </div>
              
              <Button 
                onClick={handleTestAndSave} 
                className="w-full"
                disabled={isLoading || !appPassword}
              >
                <Key className="w-4 h-4 mr-2" />
                {isLoading ? 'Testing...' : 'Test and Save App Password'}
              </Button>

              {result && (
                <Alert className={isSuccess ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  <AlertDescription className={isSuccess ? 'text-green-700 whitespace-pre-line' : 'text-red-700 whitespace-pre-line'}>
                    {result}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Success Message */}
          {isSuccess && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">🎉 Gmail Setup Complete!</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Your Gmail App Password is now configured and ready to send OTP emails.
                    </p>
                    <div className="mt-3">
                      <Button 
                        onClick={() => window.location.href = '/admin/login'}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Test OTP System
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}