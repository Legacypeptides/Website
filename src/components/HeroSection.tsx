import React from 'react';
import { Shield, Award, Microscope, CircleCheck as CheckCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/System.io Storefront.png)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-transparent"></div>
        {/* Molecule Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Molecule Structure */}
            <g stroke="white" strokeWidth="2" fill="white">
              {/* Central ring structure */}
              <circle cx="300" cy="200" r="8" />
              <circle cx="350" cy="180" r="6" />
              <circle cx="380" cy="220" r="6" />
              <circle cx="350" cy="260" r="6" />
              <circle cx="300" cy="280" r="8" />
              <circle cx="250" cy="260" r="6" />
              <circle cx="220" cy="220" r="6" />
              <circle cx="250" cy="180" r="6" />
              
              {/* Connecting lines for central ring */}
              <line x1="300" y1="200" x2="350" y2="180" />
              <line x1="350" y1="180" x2="380" y2="220" />
              <line x1="380" y1="220" x2="350" y2="260" />
              <line x1="350" y1="260" x2="300" y2="280" />
              <line x1="300" y1="280" x2="250" y2="260" />
              <line x1="250" y1="260" x2="220" y2="220" />
              <line x1="220" y1="220" x2="250" y2="180" />
              <line x1="250" y1="180" x2="300" y2="200" />
              
              {/* Side chains */}
              <circle cx="180" cy="200" r="5" />
              <line x1="220" y1="220" x2="180" y2="200" />
              
              <circle cx="420" cy="240" r="5" />
              <line x1="380" y1="220" x2="420" y2="240" />
              
              <circle cx="320" cy="320" r="5" />
              <line x1="300" y1="280" x2="320" y2="320" />
              
              {/* Second molecule cluster */}
              <circle cx="800" cy="400" r="7" />
              <circle cx="840" cy="380" r="5" />
              <circle cx="860" cy="420" r="5" />
              <circle cx="840" cy="460" r="5" />
              <circle cx="800" cy="480" r="7" />
              <circle cx="760" cy="460" r="5" />
              <circle cx="740" cy="420" r="5" />
              <circle cx="760" cy="380" r="5" />
              
              {/* Connecting lines for second cluster */}
              <line x1="800" y1="400" x2="840" y2="380" />
              <line x1="840" y1="380" x2="860" y2="420" />
              <line x1="860" y1="420" x2="840" y2="460" />
              <line x1="840" y1="460" x2="800" y2="480" />
              <line x1="800" y1="480" x2="760" y2="460" />
              <line x1="760" y1="460" x2="740" y2="420" />
              <line x1="740" y1="420" x2="760" y2="380" />
              <line x1="760" y1="380" x2="800" y2="400" />
              
              {/* Additional scattered atoms */}
              <circle cx="600" cy="150" r="4" />
              <circle cx="650" cy="180" r="3" />
              <circle cx="680" cy="160" r="4" />
              <line x1="600" y1="150" x2="650" y2="180" />
              <line x1="650" y1="180" x2="680" y2="160" />
              
              <circle cx="150" cy="500" r="5" />
              <circle cx="180" cy="520" r="4" />
              <circle cx="200" cy="480" r="4" />
              <line x1="150" y1="500" x2="180" y2="520" />
              <line x1="180" y1="520" x2="200" y2="480" />
              
              <circle cx="950" cy="200" r="6" />
              <circle cx="980" cy="180" r="4" />
              <circle cx="1000" cy="220" r="4" />
              <line x1="950" y1="200" x2="980" y2="180" />
              <line x1="980" y1="180" x2="1000" y2="220" />
              
              {/* Peptide chain representation */}
              <circle cx="500" cy="600" r="5" />
              <circle cx="530" cy="580" r="5" />
              <circle cx="560" cy="600" r="5" />
              <circle cx="590" cy="580" r="5" />
              <circle cx="620" cy="600" r="5" />
              <line x1="500" y1="600" x2="530" y2="580" />
              <line x1="530" y1="580" x2="560" y2="600" />
              <line x1="560" y1="600" x2="590" y2="580" />
              <line x1="590" y1="580" x2="620" y2="600" />
            </g>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-gold-400 font-semibold text-lg tracking-wide uppercase">
                Trusted by Thousands of Researchers
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                Premium Research Peptides for Scientific Excellence
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Discover the highest quality research peptides backed by rigorous testing and scientific precision. Our compounds are designed for serious researchers who demand excellence.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Shield className="text-gold-400" size={24} />
                <span className="font-semibold text-white">Purity Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-gold-400" size={24} />
                <span className="font-semibold text-white">Lab Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <Microscope className="text-gold-400" size={24} />
                <span className="font-semibold text-white">Research-Grade Quality</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div>
              <button 
                onClick={scrollToProducts}
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Shop Premium Peptides
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'High Purity Standard', desc: 'Third-party tested for maximum purity and potency' },
              { title: 'USA Company', desc: 'Proudly American-owned and operated business' },
              { title: 'Free Delivery', desc: 'Every order ships free within the U.S. (except Alaska & Hawaii)' },
              { title: 'Research Grade', desc: 'Professional quality for serious researchers' }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-gold-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-blue-100 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};