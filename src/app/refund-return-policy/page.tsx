import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Clock, CheckCircle, XCircle, AlertTriangle, Package } from 'lucide-react';

export default function RefundReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RotateCcw className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund & Return Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-500 mt-2">Our commitment to your satisfaction with clear and fair return guidelines.</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Our Return Promise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, we offer a straightforward return and refund policy to ensure your peace of mind.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Customer Satisfaction Guarantee:</strong> We stand behind the quality of our products and offer a hassle-free return experience within the specified timeframes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Return Timeframes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Standard Returns</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>30 days</strong> from delivery date</li>
                    <li>• Unused and in original condition</li>
                    <li>• Original packaging required</li>
                    <li>• Proof of purchase needed</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Extended Returns</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <strong>60 days</strong> for premium members</li>
                    <li>• <strong>90 days</strong> during holiday season</li>
                    <li>• Special items may vary</li>
                    <li>• Contact support for details</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> The return period begins from the date of delivery, not the order date. Please check your delivery confirmation for the exact date.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Items Eligible for Return</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Unused and unworn items in original condition</li>
                  <li>Items with original tags and packaging intact</li>
                  <li>Products with manufacturing defects</li>
                  <li>Wrong items delivered (our mistake)</li>
                  <li>Damaged items during shipping</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Items Not Eligible for Return</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Used or worn items</li>
                  <li>Items without original packaging</li>
                  <li>Personalized or customized products</li>
                  <li>Perishable goods (food, flowers, etc.)</li>
                  <li>Downloadable digital products</li>
                  <li>Items marked as "Final Sale"</li>
                  <li>Intimate apparel and swimwear (hygiene reasons)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Non-Returnable Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Strictly Non-Returnable</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li><strong>Gift Cards:</strong> Cannot be returned or refunded</li>
                  <li><strong>Clearance Items:</strong> Marked as final sale</li>
                  <li><strong>Custom Orders:</strong> Made specifically for you</li>
                  <li><strong>Personal Care Items:</strong> Opened cosmetics, toiletries</li>
                  <li><strong>Undergarments:</strong> For hygiene and safety</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                Return Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Initiate Return</h3>
                    <p className="text-gray-600">Log into your account, go to "Order History," select the item, and click "Return Item."</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Print Return Label</h3>
                    <p className="text-gray-600">Download and print the prepaid return shipping label from your account.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Package Item</h3>
                    <p className="text-gray-600">Securely pack the item in original packaging with all tags and accessories.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ship Package</h3>
                    <p className="text-gray-600">Attach the label and drop off at any authorized shipping location.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Receive Refund</h3>
                    <p className="text-gray-600">Once received and inspected, your refund will be processed within 5-7 business days.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Original Payment Method</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Full refund to original payment</li>
                    <li>• 5-7 business days processing</li>
                    <li>• No additional fees</li>
                    <li>• Standard refund method</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Store Credit</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Immediate processing</li>
                    <li>• 10% bonus credit</li>
                    <li>• No expiration date</li>
                    <li>• Flexible spending</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>Exchange Option:</strong> You can also choose to exchange for a different size, color, or product of equal or lesser value.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Return Shipping Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">When We Cover Shipping</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Wrong item delivered</li>
                  <li>Manufacturing defects</li>
                  <li>Items damaged during shipping</li>
                  <li>Our error in processing</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">When You Cover Shipping</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Change of mind</li>
                  <li>Wrong size ordered</li>
                  <li>No longer needed</li>
                  <li>Other personal reasons</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Free Return Label:</strong> For your convenience, we provide a prepaid return label. The cost will be deducted from your refund if you're responsible for return shipping.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Item Received & Inspected</span>
                  <span className="text-gray-600 font-medium">1-2 business days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Refund Initiated</span>
                  <span className="text-gray-600 font-medium">1 business day</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Credit Card/Debit Card</span>
                  <span className="text-gray-600 font-medium">5-7 business days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">PayPal/Digital Wallet</span>
                  <span className="text-gray-600 font-medium">2-3 business days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Store Credit</span>
                  <span className="text-gray-600 font-medium">Immediate</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exchange Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Exchange Guidelines</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Exchanges must be requested within 30 days of delivery</li>
                  <li>Item must be in original, unused condition</li>
                  <li>Price differences will be charged or refunded</li>
                  <li>Free shipping on exchange orders</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Easy Exchange:</strong> Request an exchange through your account, and we'll ship the new item as soon as we receive your return.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Damaged or Defective Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">If You Receive Damaged Items</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-1">
                  <li>Contact us within 48 hours of delivery</li>
                  <li>Provide photos of the damage</li>
                  <li>Keep all packaging materials</li>
                  <li>We'll arrange for replacement or full refund</li>
                </ol>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  <strong>Important:</strong> Report any shipping damage immediately. Claims reported after 48 hours may not be eligible for full refund.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">International Return Policy</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1">
                  <li>International returns may take 2-4 weeks to process</li>
                  <li>Customs duties and taxes are non-refundable</li>
                  <li>Return shipping costs are the customer's responsibility</li>
                  <li>Additional documentation may be required</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exceptions & Special Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Holiday Season Policy</h3>
                <p className="text-gray-600">Extended return period of 90 days for purchases made between November 15th and December 31st.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Gift Returns</h3>
                <p className="text-gray-600">Gift recipients can return items for store credit or exchange. Proof of purchase or gift receipt required.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Final Sale Items</h3>
                <p className="text-gray-600">Items marked as "Final Sale" cannot be returned or exchanged unless defective.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">If you have any questions about our return policy, please don't hesitate to reach out:</p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> returns@yourcompany.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Live Chat:</strong> Available on our website</p>
                <p className="text-gray-700"><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>Customer Satisfaction:</strong> Our dedicated support team is here to help make your return experience as smooth as possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}