import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, Info, FileText, Gavel, Eye } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-500 mt-2">Please read this disclaimer carefully before using our website and services.</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                General Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The information contained on this website is for general information purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important Notice:</strong> Any reliance you place on such information is therefore strictly at your own risk. We are not liable for any losses or damages arising from the use of our website or services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Product Information Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Descriptions</h3>
                <p className="text-gray-600 mb-3">We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on our website. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or error-free.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Images</h3>
                <p className="text-gray-600 mb-3">Product images are for illustrative purposes only and may differ from the actual product. Colors and appearance may vary due to monitor settings, lighting conditions, and product enhancements.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pricing and Availability</h3>
                <p className="text-gray-600">Prices and availability of products are subject to change without notice. We reserve the right to modify or discontinue products at any time without any liability to you.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-purple-600" />
                Legal & Regulatory Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">No Legal Advice</h3>
                <p className="text-gray-600 mb-3">The information on this website does not constitute legal, financial, medical, or professional advice. You should consult with a qualified professional for advice specific to your situation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Compliance with Laws</h3>
                <p className="text-gray-600 mb-3">You are responsible for compliance with all applicable local, state, national, and international laws and regulations in connection with your use of our website and services.</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  <strong>Legal Compliance:</strong> We are not responsible for any violations of laws or regulations committed by users of our website.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Third-Party Content Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Our website may contain links to third-party websites, products, or services. We are not responsible for and do not endorse the content, accuracy, or opinions expressed on such third-party websites.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Third-party links are provided for your convenience only</li>
                <li>We do not control and are not responsible for third-party websites</li>
                <li>Your use of third-party websites is at your own risk</li>
                <li>We are not liable for any losses or damages from third-party content</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website Availability Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">We strive to maintain our website's availability 24/7, but we do not guarantee uninterrupted access. Our website may be temporarily unavailable due to technical issues, maintenance, or factors beyond our control.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Service Availability:</strong> We are not liable for any losses or damages resulting from website unavailability or technical difficulties.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">To the maximum extent permitted by law, we exclude all liability for any loss or damage, whether direct or indirect, arising from your use of our website or services.</p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h3 className="font-semibold text-gray-900 mb-1">We are not liable for:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Loss of profits or revenue</li>
                    <li>• Loss of business opportunities</li>
                    <li>• Loss of data or information</li>
                    <li>• Indirect, incidental, or consequential damages</li>
                    <li>• Punitive or exemplary damages</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Services Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">If our website provides access to professional services or consultations, such services are provided on an "as is" basis without warranties of any kind.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Professional advice is for informational purposes only</li>
                <li>Always seek qualified professional advice for specific situations</li>
                <li>We are not responsible for decisions made based on website content</li>
                <li>Professional services may be subject to separate terms and conditions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health & Safety Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">If our website sells health-related products or provides health information, such content is not intended as medical advice.</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Medical Warning</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Always consult with a qualified healthcare professional</li>
                  <li>Do not disregard professional medical advice</li>
                  <li>Seek immediate medical attention for emergencies</li>
                  <li>We are not responsible for health-related decisions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Any financial information, investment advice, or market analysis provided on our website is for educational purposes only and does not constitute financial advice.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Past performance does not guarantee future results</li>
                <li>Investments involve risk and may lose value</li>
                <li>Consult with a qualified financial advisor</li>
                <li>We are not responsible for investment decisions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">All content on this website, including text, graphics, logos, images, and software, is the property of [Your Company Name] or its content suppliers and is protected by intellectual property laws.</p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 text-sm">
                  <strong>Copyright Notice:</strong> Unauthorized use of any content on this website may violate copyright, trademark, and other laws.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">While we implement security measures to protect your personal information, we cannot guarantee absolute security. Any transmission of personal information is at your own risk.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>We are not liable for unauthorized access to your data</li>
                <li>Internet communications are inherently insecure</li>
                <li>Review our Privacy Policy for more information</li>
                <li>You are responsible for protecting your account information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Restrictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Our website may be accessed from various countries worldwide. However, not all products, services, or features may be available in your geographic location.</p>
              <p className="text-gray-600">We make no representation that the materials on our website are appropriate or available for use in all locations. Those who choose to access our website from other jurisdictions do so on their own initiative and are responsible for compliance with local laws.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Indemnification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">You agree to indemnify and hold harmless [Your Company Name], its officers, directors, employees, and agents from any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Changes to Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">We reserve the right to amend this disclaimer at any time. Any changes will be posted on this page with an updated revision date. Your continued use of our website after any changes constitutes acceptance of the new disclaimer.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Severability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">If any provision of this disclaimer is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the disclaimer will otherwise remain in full force and effect.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">This disclaimer and any disputes related to it shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">If you have any questions about this disclaimer, please contact us:</p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> legal@yourcompany.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Business St, City, State 12345</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()} - This disclaimer is subject to change without notice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}