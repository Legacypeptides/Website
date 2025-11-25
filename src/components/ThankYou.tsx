import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ThankYouProps {
  orderNumber: string;
  paymentMethod: 'relay' | 'cashapp' | 'zelle';
  customerEmail: string;
  onClose: () => void;
}

export const ThankYou: React.FC<ThankYouProps> = ({
  orderNumber,
  paymentMethod,
  customerEmail,
  onClose
}) => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 rounded-full p-6">
            <CheckCircle className="text-green-600" size={64} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Received — Next Steps</h1>
        <p className="text-xl text-gray-700 mb-2">Thank you for your order!</p>
        <div className="inline-block bg-blue-50 border-2 border-blue-500 rounded-lg px-6 py-3 mb-4">
          <p className="text-sm text-gray-600 font-semibold">Your Order Number</p>
          <p className="text-3xl font-bold text-blue-600">{orderNumber}</p>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your order has been successfully submitted and is now awaiting payment.
          Please follow the payment instructions below based on the option you selected at checkout.
        </p>
      </div>

      <div className="space-y-6">
        {paymentMethod === 'relay' && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Relay ACH Invoice — Next Steps</h2>
            <p className="text-gray-700 mb-4">
              Your payment will be completed through a professional Relay ACH invoice, sent securely to your email.
              Please review the details below so you know exactly what to expect.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">📧 Invoice Delivery</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Your official business invoice will be emailed at <strong>6:00 PM EST (Monday–Saturday)</strong>.</li>
                  <li>The invoice will display:<br />
                    <span className="font-semibold">Zachary Rygol – Authorized Billing Agent</span>,<br />
                    the verified account holder for Legacy Peptides.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">💳 How to Pay</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>You can pay directly through your bank account using ACH transfer or debit account.</li>
                  <li>Payments made through Relay are fast, secure, and fully traceable.</li>
                  <li>Once payment is received and confirmed, your order status will update to <strong>Paid</strong>, and your order will move into processing.</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">⚠️ Important Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Please complete payment within <strong>24 hours</strong> to secure your order.</li>
                  <li>Unpaid orders after 24 hours will be automatically canceled.</li>
                  <li>If you don't see the invoice by 6:30 PM EST, please check your spam or promotions folder or contact support.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">❓ Need Help?</h3>
                <p className="text-gray-700">
                  If you have any questions or need assistance with your invoice, please email{' '}
                  <a href="mailto:orders@healthylegacypeptides.com" className="text-blue-600 hover:underline font-semibold">
                    orders@healthylegacypeptides.com
                  </a>{' '}
                  or reply directly to the invoice email once received.
                </p>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'zelle' && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Zelle Business</h2>
            <p className="text-gray-700 mb-4 italic">
              (Ideal for fast, direct bank-to-bank payments.)
            </p>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-4">
              <h3 className="font-bold text-xl text-gray-900 mb-3">Payment Instructions:</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                <li>Open your Zelle app or your bank's Zelle transfer option.</li>
                <li>Send the exact total amount to:<br />
                  <span className="text-2xl font-bold text-blue-600 block mt-2">➡ (407) 720-1346</span>
                </li>
                <li>In the description box, enter your <strong>Order Number only</strong> — please do not add any additional notes or emojis:<br />
                  <span className="text-xl font-bold text-gray-900 block mt-2">{orderNumber}</span>
                </li>
                <li>Once payment is received, your order will be updated to <strong>Paid</strong> and move into fulfillment.</li>
              </ol>
            </div>

            <div>
              <p className="text-gray-700 mb-2">
                The invoice will display <strong>Zachary Rygol – Authorized Billing Agent</strong>, the verified account holder for Legacy Peptides.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">⚠️ Important:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Please complete payment within <strong>24 hours</strong> to hold your order.</li>
                <li>Orders not paid within that timeframe will be automatically canceled.</li>
                <li><strong>Note:</strong> Zelle & Chase users: First-time payments may fail—please be aware.</li>
                <li>If you have any issues, contact us at{' '}
                  <a href="mailto:orders@healthylegacypeptides.com" className="text-blue-600 hover:underline font-semibold">
                    orders@healthylegacypeptides.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}

        {paymentMethod === 'cashapp' && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">CashApp Business</h2>
            <p className="text-gray-700 mb-4 italic">
              (Ideal for quick, secure mobile payments.)
            </p>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-4">
              <h3 className="font-bold text-xl text-gray-900 mb-3">Payment Instructions:</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                <li>Open your CashApp.</li>
                <li>Send the exact total amount to:<br />
                  <span className="text-2xl font-bold text-green-600 block mt-2">➡ $legacypeps</span>
                </li>
                <li>In the "For" or "Notes" field, enter your <strong>Order Number only</strong> — no additional text:<br />
                  <span className="text-xl font-bold text-gray-900 block mt-2">{orderNumber}</span>
                </li>
                <li>Once payment is received, you'll receive a confirmation email and your order will move into processing.</li>
              </ol>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">⚠️ Important:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Payments must be made within <strong>24 hours</strong> of placing your order.</li>
                <li>Orders not paid in time will be canceled automatically.</li>
                <li>If you don't receive a confirmation within 24–48 hours after paying, please email{' '}
                  <a href="mailto:orders@healthylegacypeptides.com" className="text-blue-600 hover:underline font-semibold">
                    orders@healthylegacypeptides.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">After Payment</h2>
          <p className="text-gray-700 mb-3">Once payment is received through any method above:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-6">
            <li>You'll receive an email confirmation showing your order as <strong>Paid</strong>.</li>
            <li>Your order will then move into processing and fulfillment.</li>
            <li>A shipping notification will be sent when your package is on its way.</li>
          </ul>
          <p className="text-gray-600 mt-4">
            Order confirmation has been sent to <strong>{customerEmail}</strong>
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
