import React from 'react';
import { Truck, Droplets, Heart, Users } from 'lucide-react';

export const WhatMakesUsDifferentSection: React.FC = () => {
  return (
    <section id="what-makes-us-different" className="py-20 bg-gradient-to-br from-blue-50 via-white to-gold-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
            At Legacy Peptides, we are dedicated to advancing scientific research by providing peptides of unparalleled purity and potency. Through rigorous third-party testing in leading US laboratories, we ensure our peptides consistently meet the highest quality standards.
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* FREE Shipping */}
          <div className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                FREE Shipping 🚀
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No hidden fees, no minimums—every order ships free!
              </p>
            </div>
          </div>

          {/* FREE Bacteriostatic Water */}
          <div className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Droplets className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                FREE 3ml Bacteriostatic Water 💧
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Because you can't do peptide research without it! Every order includes a free 3ml vial at no extra cost.
              </p>
            </div>
          </div>

          {/* In-House Customer Service */}
          <div className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                In-House Customer Service 🏡
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every message you send goes straight to us—no outsourced teams, just our small family making sure you're taken care of. We personally respond to each email with care, honesty, and real knowledge about the products we offer.
              </p>
            </div>
          </div>

          {/* Giving Back */}
          <div className="group">
            <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gold-200 group-hover:border-gold-300 h-full">
              <div className="bg-gradient-to-br from-gold-200 to-gold-300 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="text-gold-700" size={28} fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Giving Back with Every Order ❤️
              </h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                10% of every single purchase helps fund Missionaries worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-gold-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Experience the Legacy Peptides Difference
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of researchers who trust us for their peptide needs. Quality, service, and purpose—all in one place.
            </p>
            <button 
              onClick={() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Shop Premium Peptides
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};