import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Database, UserCheck, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-500 mt-2">Your privacy is our priority. Learn how we collect, use, and protect your information.</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Name and contact details (email, phone number)</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely)</li>
                  <li>Account credentials and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Usage data and browsing behavior</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Service Provision</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Process orders and payments</li>
                    <li>• Provide customer support</li>
                    <li>• Deliver products and services</li>
                    <li>• Manage your account</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Send order confirmations</li>
                    <li>• Provide shipping updates</li>
                    <li>• Share promotional offers</li>
                    <li>• Respond to inquiries</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Improvement</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Analyze user behavior</li>
                    <li>• Improve our services</li>
                    <li>• Personalize experience</li>
                    <li>• Develop new features</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Prevent fraud</li>
                    <li>• Ensure security</li>
                    <li>• Comply with laws</li>
                    <li>• Protect rights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Security Measures</h3>
                <p className="text-green-700 mb-3">We implement industry-standard security measures to protect your information:</p>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>SSL encryption for all data transmissions</li>
                  <li>Secure payment processing through PCI-compliant providers</li>
                  <li>Regular security audits and updates</li>
                  <li>Restricted access to personal data</li>
                  <li>Secure data storage and backup systems</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Retention</h3>
                <p className="text-gray-600">We retain your information only as long as necessary to provide our services and comply with legal obligations. You can request data deletion at any time.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Access & Correction</h3>
                  <p className="text-sm text-gray-600">Request access to or correction of your personal information.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Data Portability</h3>
                  <p className="text-sm text-gray-600">Obtain your data in a structured, machine-readable format.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Deletion</h3>
                  <p className="text-sm text-gray-600">Request deletion of your personal information.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Opt-out</h3>
                  <p className="text-sm text-gray-600">Opt-out of marketing communications at any time.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Cookies & Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cookie Policy</h3>
                <p className="text-gray-600 mb-3">We use cookies to enhance your experience:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how you use our site</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                  <li><strong>Marketing Cookies:</strong> Used for advertising purposes</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">You can control cookie settings through your browser preferences. Disabling cookies may affect site functionality.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Payment Processors:</strong> To process transactions securely</li>
                <li><strong>Shipping Partners:</strong> To deliver your orders</li>
                <li><strong>Service Providers:</strong> For analytics, marketing, and customer support</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="text-gray-600 mt-4">We ensure all third parties handle your data with appropriate security measures.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your information may be transferred to and processed in countries other than your own. We ensure adequate protection through standard contractual clauses and other legal mechanisms.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take immediate steps to delete it.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>Email:</strong> privacy@yourcompany.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Business St, City, State 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}