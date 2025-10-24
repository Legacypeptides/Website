import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Circle as HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Are your peptides for human use?",
      answer: "All products sold by Legacy Peptides are strictly For Research Use Only. Not for Human Consumption."
    },
    {
      question: "Do you ship internationally?",
      answer: "At this time, we only ship orders within the United States."
    },
    {
      question: "How long does shipping take?",
      answer: "Orders are processed within 1–3 business days and typically arrive within 4–7 business days. You'll receive a tracking number as soon as your order ships."
    },
    {
      question: "Do your products come with Certificates of Analysis (COAs)?",
      answer: "Yes. Every peptide batch is lab-tested, and Certificates of Analysis are available on the COA section to ensure transparency and quality."
    },
    {
      question: "Do you offer wholesale or bulk discounts?",
      answer: "Currently, we focus on direct research orders only. If you're interested in larger volume purchases, please contact us directly at orders@healthylegacypeptides.com."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards. Your payment is secure and encrypted."
    },
    {
      question: "What if my order arrives damaged or incorrect?",
      answer: "If your order is damaged, incorrect, or lost in transit, we'll issue a refund or replacement. Please see our Refund Policy page for full details."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="text-blue-600" size={32} />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gold-500">Questions</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our products, shipping, and policies.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <ChevronUp className="text-blue-600" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-600" size={24} />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-gold-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help with any questions about our products or services.
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
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};