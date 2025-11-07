import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, ShoppingCart, Shield, AlertCircle, CheckCircle } from 'lucide-react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-500 mt-2">Please read these terms carefully before using our services.</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> These Terms & Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and [Your Company Name], concerning your access to and use of this website.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                User Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Account Registration</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>You must notify us immediately of unauthorized use</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Account Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>You are solely responsible for all activities under your account</li>
                  <li>You must not share your login credentials</li>
                  <li>You must provide accurate contact information</li>
                  <li>You must comply with all applicable laws</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  <strong>Warning:</strong> We reserve the right to terminate accounts that violate these terms or engage in fraudulent activities.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                Products & Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Information</h3>
                <p className="text-gray-600 mb-3">We strive to be as accurate as possible in the descriptions of our products. However, we do not warrant that product descriptions, colors, information, or other content of the products are accurate, complete, reliable, current, or error-free.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>All prices are displayed in [Currency]</li>
                  <li>Prices are subject to change without notice</li>
                  <li>We reserve the right to modify or discontinue products</li>
                  <li>We are not liable for typographical errors</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Acceptance</h3>
                <p className="text-gray-600">We reserve the right to refuse or cancel any order for any reason, including but not limited to: product availability, errors in the description or price of the product, error in your order, or if we suspect fraud or an unauthorized or illegal transaction.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Payment Methods</h3>
                <p className="text-gray-600 mb-3">We accept the following payment methods:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>
                  <li>Digital Wallets (PayPal, Apple Pay, Google Pay)</li>
                  <li>Bank Transfers</li>
                  <li>Cash on Delivery (where available)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Billing & Charges</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>You agree to pay all charges at the prices in effect</li>
                  <li>Taxes will be added where applicable</li>
                  <li>Shipping charges are calculated at checkout</li>
                  <li>Payment must be received before order processing</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Security:</strong> All payment transactions are encrypted and processed through secure payment gateways compliant with PCI DSS standards.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">You may not access or use the website for any purpose other than that for which we make the website available. The website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Strictly Prohibited</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Fraudulent activities</li>
                    <li>• Copyright infringement</li>
                    <li>• Spam or unsolicited communications</li>
                    <li>• Malicious code or viruses</li>
                    <li>• System interference or hacking</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Restricted Activities</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Reverse engineering</li>
                    <li>• Data mining or scraping</li>
                    <li>• Interfering with other users</li>
                    <li>• Violating applicable laws</li>
                    <li>• Exceeding usage limits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Our Content</h3>
                <p className="text-gray-600">Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">User Content</h3>
                <p className="text-gray-600">By posting User Content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, and display the User Content in connection with the service.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  By using our website, you consent to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Breach of these Terms & Conditions</li>
                <li>Fraudulent or illegal activities</li>
                <li>Violation of applicable laws</li>
                <li>Account inactivity for extended period</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Maximum Liability:</strong> Our total liability to you for any cause of action whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us during the six-month period prior to any cause of action arising.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Governing Law</h3>
                <p className="text-gray-600">These Terms & Conditions and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of [Your State/Country].</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Arbitration</h3>
                <p className="text-gray-600">Any dispute arising from or relating to these Terms & Conditions or the service shall be resolved through binding arbitration rather than in court, except that you may assert claims in small claims court if your claims qualify.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Indemnification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of your breach of these Terms & Conditions or the documents they incorporate by reference.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Severability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">If any provision or part of a provision of these Terms & Conditions is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms & Conditions and does not affect the validity and enforceability of any remaining provisions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Entire Agreement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">These Terms & Conditions, together with our Privacy Policy, constitute the entire agreement between you and [Your Company Name] concerning your use of the service.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">We reserve the right, at our sole discretion, to modify or replace these Terms & Conditions at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">If you have any questions about these Terms & Conditions, please contact us:</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>Email:</strong> legal@yourcompany.com</p>
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