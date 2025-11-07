'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Heart, Award, Users, Clock, ChefHat, Star } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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
              <h1 className="text-2xl font-bold text-red-800">About Us</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-9xl mb-6">🥭</div>
            <h1 className="text-5xl font-bold text-red-800 mb-4">The Story of Bihar Achar Store</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bringing the authentic taste of Bihar to every home, one jar of pickle at a time
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-red-800 mb-6">Our Heritage</h2>
              <p className="text-gray-700 mb-4">
                Bihar Achar Store was born from a grandmother's love for traditional pickling methods. 
                What started as a small kitchen operation in Patna has now grown into a beloved brand 
                that brings the authentic taste of Bihar to homes across India.
              </p>
              <p className="text-gray-700 mb-4">
                Our recipes have been passed down through generations, each jar telling a story of 
                tradition, love, and the rich culinary heritage of Bihar. We believe in preserving 
                these time-honored methods while maintaining the highest standards of quality and hygiene.
              </p>
              <p className="text-gray-700">
                Every pickle we make is a tribute to the vibrant culture and flavors of Bihar, 
                carefully crafted to bring you the taste that reminds you of home.
              </p>
            </div>
            <div className="text-center">
              <div className="text-9xl">👵🏻</div>
              <p className="text-gray-600 mt-4 italic">"Tradition in every jar"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
                <p className="text-gray-600">Every batch is prepared with care and attention to detail</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-gray-600">Only the finest ingredients make it into our pickles</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Traditional Methods</h3>
                <p className="text-gray-600">Preserving authentic recipes and techniques</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Trust</h3>
                <p className="text-gray-600">Building relationships through quality and service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">Our Pickling Process</h2>
            <p className="text-gray-600 text-lg">From farm to your table</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">Sourced from local farms and markets</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧂</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Traditional Spices</h3>
              <p className="text-gray-600">Authentic spices and mustard oil</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏺</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sun Dried</h3>
              <p className="text-gray-600">Natural sun drying for perfect flavor</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Hygienic Packing</h3>
              <p className="text-gray-600">Clean and secure packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">The people behind your favorite pickles</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">👵🏻</div>
                <h3 className="text-xl font-semibold mb-2">Grandmother's Recipe</h3>
                <p className="text-gray-600 mb-2">Head Recipe Master</p>
                <p className="text-sm text-gray-500">50+ years of pickling experience</p>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">👨🏻‍🍳</div>
                <h3 className="text-xl font-semibold mb-2">Rajesh Kumar</h3>
                <p className="text-gray-600 mb-2">Master Chef</p>
                <p className="text-sm text-gray-500">Expert in traditional techniques</p>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">👩🏻‍💼</div>
                <h3 className="text-xl font-semibold mb-2">Priya Singh</h3>
                <p className="text-gray-600 mb-2">Operations Manager</p>
                <p className="text-sm text-gray-500">Ensuring quality and delivery</p>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">10,000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">15+</div>
              <p className="text-gray-600">Pickle Varieties</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <p className="text-gray-600">Cities Delivered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">4.9★</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-800 mb-4">Experience the Taste of Bihar</h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of satisfied customers who have made our pickles a part of their daily meals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}