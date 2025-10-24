import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-88px)]">
          <div className="space-y-6 text-gray-700">
            <p className="text-sm text-gray-500">
              <strong>Effective Date:</strong> January 1, 2025
            </p>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h3>
              <p className="leading-relaxed">
                Legacy Peptides ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h3>
              <p className="leading-relaxed mb-3">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Order history and purchase information</li>
                <li>Communications with our customer service team</li>
                <li>Account credentials if you create an account</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h3>
              <p className="leading-relaxed mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping notifications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Detect and prevent fraud or unauthorized transactions</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Information Sharing and Disclosure</h3>
              <p className="leading-relaxed mb-3">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (e.g., payment processors, shipping carriers)</li>
                <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
              </ul>
              <p className="leading-relaxed mt-3">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h3>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights and Choices</h3>
              <p className="leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, please contact us at orders@healthylegacypeptides.com
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. Cookies and Tracking Technologies</h3>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">8. Data Retention</h3>
              <p className="leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">9. Children's Privacy</h3>
              <p className="leading-relaxed">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">10. Changes to This Privacy Policy</h3>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date."
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">11. Contact Us</h3>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <p className="font-semibold text-gray-900">Legacy Peptides</p>
                <p>Email: orders@healthylegacypeptides.com</p>
                <p className="text-sm text-gray-600 mt-2">Response time: Within 24 hours</p>
              </div>
            </section>
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
