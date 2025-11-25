import React from 'react';
import { Heart, Shield, Award, Microscope, Users } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gold-500">Legacy Peptides</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded with a mission to provide research-grade peptides that meet the highest standards of quality, consistency, and integrity.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Legacy Peptides was founded with a simple mission: to provide research-grade peptides that meet the highest standards of quality, consistency, and integrity. In a space often clouded by uncertainty, we set out to create a brand that researchers can trust.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every vial we offer is part of a bigger picture. For us, this is more than a business — it's about leaving a legacy of excellence and purpose. We believe in giving researchers the tools they need to pursue breakthroughs in science, fitness, and health.
            </p>
            <div className="bg-gradient-to-r from-gold-500/20 to-gold-400/20 border border-gold-400/30 rounded-2xl p-6 mb-6">
              <p className="text-lg font-semibold text-gray-800 mb-3">But Legacy Peptides is also unique in another way:</p>
              <div className="flex items-center gap-3">
                <Heart className="text-gold-500 flex-shrink-0" size={24} fill="currentColor" />
                <p className="text-lg text-gray-700"><strong>10% of every purchase goes directly to supporting Missionaries worldwide.</strong></p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              This means your research order doesn't just supply the highest quality peptides — it also supports people making a difference across the globe.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that when business is done with integrity, it can create ripples far beyond the lab. That's why we put the same level of care into our giving as we do into our product quality.
            </p>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gold-500">Three Pillars</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-gold-50 rounded-2xl p-8 mb-6 group-hover:shadow-lg transition-all duration-300">
                <Award className="text-blue-600 mx-auto mb-4" size={32} />
                <h4 className="text-xl font-bold text-gray-900 mb-3">Excellence in Quality</h4>
                <p className="text-gray-600 leading-relaxed">Sourced and packaged with attention to detail.</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-gold-50 rounded-2xl p-8 mb-6 group-hover:shadow-lg transition-all duration-300">
                <Shield className="text-blue-600 mx-auto mb-4" size={32} />
                <h4 className="text-xl font-bold text-gray-900 mb-3">Transparency</h4>
                <p className="text-gray-600 leading-relaxed">Every batch is lab-tested with Certificates of Analysis available on each product page.</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-gold-50 rounded-2xl p-8 mb-6 group-hover:shadow-lg transition-all duration-300">
                <Heart className="text-blue-600 mx-auto mb-4" size={32} />
                <h4 className="text-xl font-bold text-gray-900 mb-3">Purpose Beyond Profit</h4>
                <p className="text-gray-600 leading-relaxed">Supporting global missions and creating a positive impact.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Thank you for choosing Legacy Peptides. With every order, you become part of something greater — advancing research today while building a brighter tomorrow.
          </p>
        </div>

        {/* Founder's Note */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-8 lg:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            {/* Founders Photo */}
            <div className="text-center mb-8">
              <img
                src="Amanda and I copy.jpg"
                alt="Zach and Amanda, Founders of Legacy Peptides"
                className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-gold-400 shadow-2xl"
              />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gold-500 text-blue-900 px-4 py-2 rounded-lg font-bold">
                🟦 Founder's Note
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gold-400">A Note from Zach & Amanda</h3>
            <div className="space-y-6 text-blue-100 leading-relaxed">
              <p>
                When we started Legacy Peptides, we knew we wanted to create more than just another supplement store. For us, this business is about combining our passion for health and research with a commitment to faith and purpose.
              </p>
              <p>
                We believe that science and integrity go hand in hand — and that by offering premium research peptides, we can support discoveries that make a difference. But equally important, we wanted this company to give back in a meaningful way. That's why we donate 10% of every sale to support missionaries worldwide.
              </p>
              <p>
                For us, Legacy Peptides is more than a brand — it's our way of serving both the research community and a higher purpose.
              </p>
              <p>
                We're grateful for every customer who joins us on this journey. Together, we're not only advancing research but also helping people in need across the globe.
              </p>
              <p>
                Thank you for trusting us with your research needs — and for being part of something bigger.
              </p>
              <div className="mt-8 pt-6 border-t border-blue-700">
                <div className="text-center">
                  <img
                    src="Zach and Amanda Signature copy.png"
                    alt="Zach and Amanda Signature"
                    className="mx-auto mb-4 max-w-xs opacity-90"
                  />
                  <p className="font-semibold text-white">
                    <span className="text-gold-400">Zach & Amanda</span><br />
                    <span className="text-sm">Founders, Legacy Peptides</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};