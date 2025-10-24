import React from 'react';
import { Truck, Package, MapPin, Clock, Shield, AlertCircle } from 'lucide-react';

export const ShippingPolicySection: React.FC = () => {
  return (
    <section id="shipping" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Truck className="text-blue-600" size={32} />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Shipping <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gold-500">Policy</span>
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="text-blue-600" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">Shipping Regions</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            We ship to the continental United States only. International shipping is not available at this time.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-3">
            <p className="text-blue-800 font-medium">
              Domestic Shipping Only: Continental United States addresses only
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <p className="text-amber-800 font-medium">
              We do not ship to Hawaii or Alaska at this time
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-blue-600" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">Processing & Delivery Times</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Order Processing</p>
                <p className="text-gray-700">Orders are processed within 1-3 business days after payment confirmation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Shipping Time</p>
                <p className="text-gray-700">Standard shipping typically takes 4-7 business days after order processing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Tracking Information</p>
                <p className="text-gray-700">You'll receive a tracking number via email as soon as your order ships</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-blue-600" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">Shipping Methods & Costs</h3>
          </div>
          <div className="bg-gradient-to-r from-gold-500/20 to-gold-400/20 border border-gold-400/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900 text-xl">Free Shipping</span>
              <span className="text-gold-600 font-bold text-2xl">$0.00</span>
            </div>
            <p className="text-gray-700">On all orders, no minimum required</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-blue-600" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">Packaging & Handling</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            All orders are carefully packaged to ensure products arrive in perfect condition:
          </p>
          <div className="space-y-3">
            {[
              'Discreet packaging with no external product labeling',
              'Secure sealing to prevent tampering or damage',
              'All products clearly labeled "For Research Use Only"'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-amber-600" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">Important Notes</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-semibold text-amber-900 mb-2">Address Accuracy</p>
              <p className="text-amber-800">Please ensure your shipping address is correct. We cannot be held responsible for orders shipped to incorrect addresses provided at checkout.</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">Lost or Stolen Packages</p>
              <p className="text-blue-800">Once a package is marked as delivered by the carrier, Legacy Peptides is not responsible for lost or stolen items. Please contact the carrier directly for assistance.</p>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-500 p-4">
              <p className="font-semibold text-gray-900 mb-2">Order Modifications</p>
              <p className="text-gray-700">Once an order is placed, we cannot modify the shipping address or cancel the order. Please double-check all details before completing your purchase.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 text-gold-400">Questions About Shipping?</h3>
          <p className="text-blue-100 leading-relaxed mb-6">
            If you have questions about your order status, tracking information, or our shipping policies, please contact our support team.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};
