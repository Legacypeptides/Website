import React from 'react';
import { Menu, X, Mail, Heart, ShoppingCart, Settings } from 'lucide-react';
import { useCart } from './CartProvider';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onCartOpen: () => void;
  onAdminOpen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu, onCartOpen, onAdminOpen }) => {
  const { cartCount } = useCart();

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        onAdminOpen?.();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onAdminOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div></div>
          <div></div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>orders@healthylegacypeptides.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/public/LEGACY PEPTIDES lOGO.png"
                alt="Legacy Peptides"
                className="h-16 w-16 object-contain"
              />
              <div className="ml-3">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                  Legacy Peptides
                </h1>
                <p className="text-sm text-gold-500 font-medium">Premium Research Compounds</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </a>
              <a href="#products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Products
              </a>
              <a href="#coas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                COAs
              </a>
              <a href="#policies" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Refund Policies
              </a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                FAQ
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={onCartOpen}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                Shop Now
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                Home
              </a>
              <a href="#products" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                Products
              </a>
              <a href="#coas" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                COAs
              </a>
              <a href="#policies" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                Refund Policies
              </a>
              <a href="#faq" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                FAQ
              </a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                About
              </a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                Contact
              </a>
              <button
                onClick={onCartOpen}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                <ShoppingCart size={20} />
                Cart ({cartCount})
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-blue-900 py-3 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="relative">
          <div className="animate-scroll whitespace-nowrap flex items-center justify-center gap-3 font-semibold text-lg">
            <Heart size={18} className="text-blue-800 animate-bounce-gentle" fill="currentColor" />
            <span>10% Of All Sales Go To Help Missionaries Worldwide</span>
            <Heart size={18} className="text-blue-800 animate-bounce-gentle" fill="currentColor" />
            <span className="mx-12">•</span>
            <span>Free Shipping On All Orders</span>
            <Heart size={18} className="text-blue-800 animate-bounce-gentle" fill="currentColor" />
            <span className="mx-12">•</span>
            <Heart size={18} className="text-blue-800 animate-bounce-gentle" fill="currentColor" />
            <span>10% Of All Sales Go To Help Missionaries Worldwide</span>
            <Heart size={18} className="text-blue-800 animate-bounce-gentle" fill="currentColor" />
            <span className="mx-12">•</span>
            <span>Free Shipping On All Orders</span>
            <Heart size={18} className="text-blue-800 animate-bounce-gentle" fill="currentColor" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </>
  );
};