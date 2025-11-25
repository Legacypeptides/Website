import React from 'react';
import { Shield, CircleCheck as CheckCircle, Circle as XCircle, Mail, Clock } from 'lucide-react';

export const RefundPolicySection: React.FC = () => {
  return (
    <section id="policies" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="text-blue-600" size={32} />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Refund & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gold-500">Replacement Policy</span>
            </h2>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-4 text-gold-400">Our Commitment</h3>
          <p className="text-blue-100 leading-relaxed text-lg">
            At Legacy Peptides, we stand behind the quality of our products and want every customer to feel confident ordering from us.
          </p>
        </div>

        {/* Eligible Refunds */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-green-600" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">Eligible Refunds or Replacements</h3>
          </div>
          <p className="text-gray-700 mb-6">
            We will provide a refund or replacement in the following situations:
          </p>
          <div className="space-y-4">
            {[
              'Your order arrives damaged',
              'You receive the wrong item',
              'Your package is lost in transit'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Refundable Situations */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <XCircle className="text-red-600" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">Non-Refundable Situations</h3>
          </div>
          <p className="text-gray-700 mb-6">
            Refunds cannot be issued if:
          </p>
          <div className="space-y-4">
            {[
              'A product has been opened or used',
              'The shipping address was entered incorrectly at checkout',
              'Products are purchased for human use (all items are strictly For Research Use Only)'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Request */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="text-blue-600" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">How to Request a Refund</h3>
          </div>
          <p className="text-gray-700 mb-6">
            To request a refund or replacement:
          </p>
          <div className="space-y-4">
            {[
              'Email us at orders@healthylegacypeptides.com',
              'Include your order number and photos if applicable',
              'Requests must be made within 7 days of delivery'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Time */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-gold-500" size={28} />
            <h3 className="text-2xl font-bold text-gray-900">Processing Time</h3>
          </div>
          <p className="text-gray-700">
            Once approved, refunds are typically processed within 3–5 business days, depending on your payment provider.
          </p>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gold-500/20 to-gold-400/20 border border-gold-400/30 rounded-2xl p-8">
            <p className="text-lg text-gray-800 leading-relaxed">
              We value your trust in Legacy Peptides and are committed to resolving any order issues quickly and fairly.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-gold-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help with Your Order?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Have questions about our refund policy or need to request a refund? Contact our team and we'll help resolve your issue.
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
      </div>
    </section>
  );
};