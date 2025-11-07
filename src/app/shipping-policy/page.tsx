import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, MapPin, Package, CheckCircle, AlertCircle } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Truck className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-500 mt-2">Fast, reliable, and affordable shipping options to get your orders delivered safely.</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Our Shipping Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We partner with trusted shipping carriers to ensure your orders arrive safely and on time. Our shipping policy is designed to provide you with clear expectations and transparent pricing.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Fast & Reliable:</strong> Most orders are processed within 1-2 business days and delivered according to your selected shipping method.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Standard Processing</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>1-2 business days</strong> for most items</li>
                    <li>• Orders placed before 2 PM ship same day</li>
                    <li>• Business days: Monday-Friday</li>
                    <li>• Excludes holidays</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Special Processing</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <strong>3-5 business days</strong> for custom items</li>
                    <li>• <strong>7-10 days</strong> for personalized products</li>
                    <li>• <strong>2-3 days</strong> for backordered items</li>
                    <li>• You'll be notified of delays</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Order Processing:</strong> Processing time begins after order confirmation and payment verification. During high-demand periods, processing may take longer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                Shipping Options & Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">Standard Shipping</h3>
                    <span className="text-green-600 font-bold">$5.99</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">5-7 business days delivery</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Available for all US addresses</li>
                    <li>• Tracking included</li>
                    <li>• Free on orders over $50</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">Express Shipping</h3>
                    <span className="text-blue-600 font-bold">$12.99</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">2-3 business days delivery</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Available for most US addresses</li>
                    <li>• Priority handling</li>
                    <li>• Detailed tracking</li>
                    <li>• Free on orders over $100</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">Overnight Shipping</h3>
                    <span className="text-purple-600 font-bold">$24.99</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Next business day delivery</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Order by 2 PM for next-day delivery</li>
                    <li>• Limited to select areas</li>
                    <li>• Signature required</li>
                    <li>• Not available for P.O. boxes</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">International Shipping</h3>
                    <span className="text-orange-600 font-bold">From $19.99</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">7-21 business days delivery</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Available for most countries</li>
                    <li>• Customs duties may apply</li>
                    <li>• Tracking included</li>
                    <li>• Rates vary by destination</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Shipping Destinations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Domestic Shipping (USA)</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>All 50 states</li>
                  <li>Puerto Rico</li>
                  <li>Guam</li>
                  <li>U.S. Virgin Islands</li>
                  <li>Military addresses (APO/FPO)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">International Shipping</h3>
                <p className="text-gray-600 mb-2">We ship to over 100 countries worldwide. Popular destinations include:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Canada, Mexico, United Kingdom</li>
                  <li>Germany, France, Italy, Spain</li>
                  <li>Australia, Japan, Singapore</li>
                  <li>And many more countries</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Check Availability:</strong> Enter your address at checkout to see available shipping options and rates for your location.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                Package Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How to Track Your Order</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-1">
                  <li>Once your order ships, you'll receive an email with tracking information</li>
                  <li>Click the tracking link in the email or log into your account</li>
                  <li>Enter your tracking number on the carrier's website</li>
                  <li>Monitor your package's journey to your doorstep</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tracking Updates</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Real-time tracking for all shipments</li>
                  <li>Email notifications for major delivery milestones</li>
                  <li>SMS updates available (opt-in)</li>
                  <li>Delivery confirmation and photos where available</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                Shipping Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Items That Cannot Be Shipped</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Hazardous materials (flammables, explosives)</li>
                  <li>Perishable items requiring refrigeration</li>
                  <li>Live animals or plants</li>
                  <li>Illegal items or prohibited goods</li>
                  <li>Items exceeding weight/size limits</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Address Restrictions</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>P.O. boxes (for some shipping methods)</li>
                  <li>Hotel addresses (without special arrangement)</li>
                  <li>Forwarding services</li>
                  <li>Some rural or remote areas</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Important Information</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1">
                  <li><strong>Customs Duties:</strong> International orders may be subject to customs duties and taxes</li>
                  <li><strong>Import Regulations:</strong> Some items may be restricted in certain countries</li>
                  <li><strong>Delivery Time:</strong> International shipping takes 7-21 business days</li>
                  <li><strong>Tracking:</strong> International tracking may have limited updates</li>
                  <li><strong>Returns:</strong> International returns may incur additional shipping costs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Customs & Import Fees</h3>
                <p className="text-gray-600">International customers are responsible for any customs duties, taxes, or import fees imposed by their country. These charges are not included in our shipping rates and are collected by the delivery carrier.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Lost or Delayed Packages</h3>
                <p className="text-gray-600 mb-3">If your package is lost or significantly delayed:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Contact us within 30 days of the expected delivery date</li>
                  <li>We'll file a claim with the shipping carrier</li>
                  <li>Replacement or refund will be processed once claim is resolved</li>
                  <li>Most claims are resolved within 5-10 business days</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Damaged Packages</h3>
                <p className="text-gray-600 mb-3">If your package arrives damaged:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Take photos of the damage immediately</li>
                  <li>Keep all packaging materials</li>
                  <li>Contact us within 48 hours of delivery</li>
                  <li>We'll arrange for replacement or refund</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Failed Deliveries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What Happens If Delivery Fails</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Carrier will attempt delivery 2-3 times</li>
                  <li>Package will be held at local facility for 5-7 days</li>
                  <li>You'll receive notification about pickup options</li>
                  <li>Unclaimed packages will be returned to sender</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 text-sm">
                  <strong>Important:</strong> If a package is returned due to incorrect address or customer unavailability, reshipping fees will apply.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping During Holidays</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Holiday Shipping Schedule</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Processing times may be extended during peak seasons</li>
                  <li>Order by December 15th for Christmas delivery (Standard)</li>
                  <li>Order by December 20th for Christmas delivery (Express)</li>
                  <li>No shipping on major holidays (Christmas, Thanksgiving, etc.)</li>
                  <li>Check website for specific holiday deadlines</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Included Coverage</h3>
                  <p className="text-gray-600">All orders include basic shipping insurance up to $100. Additional insurance can be purchased at checkout for high-value items.</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Additional Insurance Options</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• $100 - $500 coverage: $2.99</li>
                    <li>• $500 - $1,000 coverage: $4.99</li>
                    <li>• $1,000 - $2,500 coverage: $9.99</li>
                    <li>• $2,500+ coverage: Custom quote</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Have questions about shipping? We're here to help!</p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-gray-700"><strong>Shipping Inquiries:</strong> shipping@yourcompany.com</p>
                <p className="text-gray-700"><strong>Customer Service:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Live Chat:</strong> Available on our website</p>
                <p className="text-gray-700"><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>Pro Tip:</strong> Create an account to save shipping addresses, track orders, and access faster checkout.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}