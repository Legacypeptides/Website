import React from 'react';
import { CreditCard, Building2, Smartphone, AlertCircle, CheckCircle } from 'lucide-react';

export const PaymentOptionsSection: React.FC = () => {
  return (
    <section id="payment-options" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Secure Payment Options
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the payment method that works best for you. All payments are secure, trackable, and processed through verified business channels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Relay ACH */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <Building2 className="mb-3" size={40} />
              <h3 className="text-2xl font-bold mb-2">Relay ACH Invoice</h3>
              <p className="text-blue-100 text-sm">Official Business Payment</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Professional business invoicing sent directly to your email at 6:00 PM EST (Monday–Saturday).
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">Pay directly through your bank using ACH or debit account</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">Fast, secure, and fully traceable</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">Professional business documentation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zelle */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
              <CreditCard className="mb-3" size={40} />
              <h3 className="text-2xl font-bold mb-2">Zelle Business</h3>
              <p className="text-purple-100 text-sm">Fast Bank-to-Bank Transfer</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Send payment safely through Legacy Peptides official Zelle Business network.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">Direct bank-to-bank payment</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">No third-party processor fees</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">Instant payment confirmation</p>
                </div>
              </div>
            </div>
          </div>

          {/* CashApp */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-green-400 transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
              <Smartphone className="mb-3" size={40} />
              <h3 className="text-2xl font-bold mb-2">CashApp Business</h3>
              <p className="text-green-100 text-sm">Quick Mobile Payment</p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                After checkout, you'll see our CashApp Business payment instructions.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">Fast mobile payments</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">Secure and convenient</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 text-sm">No card processing fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-amber-500 rounded-full p-3 flex-shrink-0">
              <AlertCircle className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Important Payment Information</h3>
              <p className="text-gray-700">Please read carefully to ensure smooth order processing</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                24-Hour Payment Window
              </h4>
              <p className="text-gray-700 text-sm">
                Complete payment within 24 hours to secure your order. Unpaid orders will be automatically canceled to keep inventory accurate.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                Order Number Only
              </h4>
              <p className="text-gray-700 text-sm">
                When sending payment via Zelle or CashApp, include <strong>only your order number</strong> in the memo/note field—no other text, names, or emojis.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                Payment Confirmation
              </h4>
              <p className="text-gray-700 text-sm">
                After checkout, full payment instructions will appear on the next page. You'll receive email confirmation once payment is received and verified.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                Need Help?
              </h4>
              <p className="text-gray-700 text-sm">
                Contact us at <a href="mailto:orders@healthylegacypeptides.com" className="text-blue-600 hover:underline font-semibold">orders@healthylegacypeptides.com</a> if you have any questions or issues with payment.
              </p>
            </div>
          </div>
        </div>

        {/* After Payment Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Happens After Payment?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Confirmation Email</h4>
              <p className="text-gray-600 text-sm">
                You'll receive an email showing your order status updated to <strong>Paid</strong>.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Order Processing</h4>
              <p className="text-gray-600 text-sm">
                Your order moves into processing and fulfillment. We prepare your peptides for shipment.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Shipping Notification</h4>
              <p className="text-gray-600 text-sm">
                You'll receive tracking information when your package ships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
