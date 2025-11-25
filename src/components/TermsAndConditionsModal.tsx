import React from 'react';
import { X } from 'lucide-react';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Terms and Conditions</h2>
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h3>
              <p className="leading-relaxed">
                By accessing and using the Legacy Peptides website and purchasing our products, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Research Use Only</h3>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-3">
                <p className="font-semibold text-amber-900 mb-2">IMPORTANT DISCLAIMER</p>
                <p className="leading-relaxed text-amber-800">
                  All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes only. These products are NOT intended for human or animal consumption, therapeutic use, or any diagnostic or medical application.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Products are labeled "For Research Use Only – Not for Human or Animal Use"</li>
                <li>We do not provide instructions for preparation, reconstitution, administration, or dosage</li>
                <li>No product is classified as a drug, dietary supplement, or medical device under federal law</li>
                <li>Any misuse or unauthorized application is strictly prohibited and may violate applicable laws</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Product Information and Accuracy</h3>
              <p className="leading-relaxed">
                We strive to provide accurate product information, including descriptions, pricing, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Orders and Payment</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Order Acceptance:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason.</li>
                <li><strong>Payment:</strong> Payment must be completed within 24 hours of placing an order through our approved payment methods (Relay ACH, Zelle, or CashApp).</li>
                <li><strong>Pricing:</strong> Prices are subject to change without notice. The price charged will be the price displayed at the time of order placement.</li>
                <li><strong>Order Cancellation:</strong> Unpaid orders will be automatically canceled after 24 hours.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Shipping and Delivery</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We ship to addresses within the United States only</li>
                <li>Shipping times are estimates and not guaranteed</li>
                <li>Risk of loss and title pass to you upon delivery to the carrier</li>
                <li>We are not responsible for delays caused by shipping carriers or circumstances beyond our control</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Refund and Return Policy</h3>
              <p className="leading-relaxed mb-3">
                Please refer to our separate Refund Policy for detailed information about returns, refunds, and exchanges. Key points include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Refunds are available within 30 days of purchase for unopened, unused products</li>
                <li>Damaged or defective products must be reported within 48 hours of delivery</li>
                <li>Refund processing takes 5-10 business days</li>
                <li>Shipping costs are non-refundable unless the error was on our part</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. Intellectual Property</h3>
              <p className="leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of Legacy Peptides or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">8. Limitation of Liability</h3>
              <p className="leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEGACY PEPTIDES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">9. Indemnification</h3>
              <p className="leading-relaxed">
                You agree to indemnify and hold harmless Legacy Peptides, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of our products or violation of these Terms and Conditions.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">10. Age Restriction</h3>
              <p className="leading-relaxed">
                You must be at least 18 years of age to purchase products from Legacy Peptides. By placing an order, you represent and warrant that you are at least 18 years old.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">11. Prohibited Uses</h3>
              <p className="leading-relaxed mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use products for human or animal consumption</li>
                <li>Resell products as approved for human or animal use</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Engage in fraudulent activities or provide false information</li>
                <li>Interfere with the proper functioning of our website</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">12. Governing Law</h3>
              <p className="leading-relaxed">
                These Terms and Conditions are governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">13. Dispute Resolution</h3>
              <p className="leading-relaxed">
                Any disputes arising out of or relating to these Terms and Conditions or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">14. Changes to Terms</h3>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">15. Severability</h3>
              <p className="leading-relaxed">
                If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">16. Contact Information</h3>
              <p className="leading-relaxed">
                For questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <p className="font-semibold text-gray-900">Legacy Peptides</p>
                <p>Email: orders@healthylegacypeptides.com</p>
                <p className="text-sm text-gray-600 mt-2">Response time: Within 24 hours</p>
              </div>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="font-semibold text-blue-900 mb-2">By purchasing from Legacy Peptides, you acknowledge that:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
                <li>You have read, understood, and agree to these Terms and Conditions</li>
                <li>You will use products for research purposes only</li>
                <li>You are at least 18 years of age</li>
                <li>All information provided is accurate and truthful</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
