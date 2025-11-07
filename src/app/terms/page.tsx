'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-red-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🥭</div>
              <h1 className="text-2xl font-bold text-red-800">Terms & Policies</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Terms and Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
                <p className="text-gray-600">
                  By accessing and using Bihar Achar Store, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Product Information</h3>
                <p className="text-gray-600">
                  We strive to be as accurate as possible in the descriptions of our products. However, we do 
                  not warrant that product descriptions, colors, information, or other content of the products 
                  are accurate, complete, reliable, current, or error-free.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Pricing and Availability</h3>
                <p className="text-gray-600">
                  All prices are shown in Indian Rupees (INR) and are inclusive of all applicable taxes. 
                  We reserve the right to modify prices at any time without prior notice. Product availability 
                  is subject to change without notice.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4. Order Acceptance</h3>
                <p className="text-gray-600">
                  We reserve the right to refuse or cancel any order for any reason, including but not limited 
                  to: product availability, errors in the description or price of the product, error in your 
                  order, or if we suspect fraud or an unauthorized or illegal transaction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">5. Payment Terms</h3>
                <p className="text-gray-600">
                  Payment can be made through UPI or Cash on Delivery. For UPI payments, orders will be 
                  processed only after successful verification of payment screenshots. COD orders may incur 
                  additional charges.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
                <p className="text-gray-600">
                  We collect information you provide directly to us, such as when you create an account, 
                  place an order, or contact us for support. This includes your name, email address, 
                  phone number, and delivery address.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. How We Use Your Information</h3>
                <p className="text-gray-600">
                  We use the information we collect to provide, maintain, and improve our services, process 
                  transactions, send you technical notices and support messages, and communicate with you 
                  about products, services, and promotional offers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Information Sharing</h3>
                <p className="text-gray-600">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this Privacy Policy. We may share your 
                  information with delivery partners for order fulfillment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4. Data Security</h3>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Refund and Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Order Cancellation</h3>
                <p className="text-gray-600">
                  Orders can be cancelled within 2 hours of placement. After this period, orders cannot be 
                  cancelled as they enter the processing stage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Refunds</h3>
                <p className="text-gray-600">
                  Refunds are only provided in case of damaged products or wrong items delivered. 
                  Customers must report issues within 24 hours of delivery with photographic evidence.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Replacement Policy</h3>
                <p className="text-gray-600">
                  In case of damaged or incorrect products, we will provide a replacement subject to 
                  availability. If replacement is not available, a refund will be processed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4. Refund Processing Time</h3>
                <p className="text-gray-600">
                  Refunds will be processed within 7-10 working days after approval. The amount will be 
                  credited to the original payment method.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping and Delivery Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Delivery Timeline</h3>
                <p className="text-gray-600">
                  Standard delivery takes 5-7 working days within India. Delivery timelines may vary 
                  based on location and external factors.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Shipping Charges</h3>
                <p className="text-gray-600">
                  We offer free shipping on all orders above ₹500. For orders below ₹500, a nominal 
                  shipping charge of ₹40 may apply.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Delivery Areas</h3>
                <p className="text-gray-600">
                  We currently deliver across India. Some remote areas may have extended delivery timelines 
                  or additional charges.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">4. Order Tracking</h3>
                <p className="text-gray-600">
                  Once your order is shipped, you will receive a tracking number via WhatsApp or SMS to 
                  track your delivery status.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms & Policies, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> info@biharachar.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> Near Gandhi Maidan, Patna, Bihar - 800001</p>
              </div>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center text-gray-500 text-sm">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}