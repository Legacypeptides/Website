import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';

export const Footer: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="LEGACY PEPTIDES lOGO.png"
                alt="Legacy Peptides"
                className="h-12 w-12 object-contain"
              />
              <div className="ml-3">
                <h3 className="text-xl font-bold text-white">Legacy Peptides</h3>
                <p className="text-gold-400 text-sm">Premium Research Compounds</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Leading provider of high-quality research peptides, committed to advancing scientific discovery through premium compounds and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gold-400">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
              <li><a href="#coas" className="text-gray-300 hover:text-white transition-colors">COAs</a></li>
              <li><a href="#policies" className="text-gray-300 hover:text-white transition-colors">Refund Policies</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gold-400">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gold-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white">orders@healthylegacypeptides.com</p>
                  <p className="text-gray-300 text-sm">24hr response time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors">Terms of Service</button>
              <a href="#disclaimer" className="hover:text-white transition-colors">Research Disclaimer</a>
              <a href="#shipping" className="hover:text-white transition-colors">Shipping Policy</a>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 Legacy Peptides. All rights reserved.
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              Disclaimer: Products are intended for research purposes only. Not for human or animal consumption. 
              Please consult with a healthcare professional before use.
            </p>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsAndConditionsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </footer>
  );
};