import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhatMakesUsDifferentSection } from './components/WhatMakesUsDifferentSection';
import { ProductsSection } from './components/ProductsSection';
import { AboutUsSection } from './components/QualitySection';
import { COASection } from './components/COASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FAQSection } from './components/FAQSection';
import { RefundPolicySection } from './components/RefundPolicySection';
import { PaymentOptionsSection } from './components/PaymentOptionsSection';
import { ShippingPolicySection } from './components/ShippingPolicySection';
import { ProductPage } from './components/ProductPage';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { CartProvider } from './components/CartProvider';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  benefits: string[];
  detailedDescription: string;
  specifications: {
    purity: string;
    concentration: string;
    vialSize: string;
    storage: string;
  };
  researchApplications: string[];
  safetyInfo: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleProductSelect = (product: Product) => setSelectedProduct(product);
  const handleProductClose = () => setSelectedProduct(null);
  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);
  const handleCheckoutOpen = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const handleCheckoutClose = () => setIsCheckoutOpen(false);
  const handleBackToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };
  
  const handleAdminOpen = () => {
    if (isAdminLoggedIn) {
      setIsAdminOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };
  
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setIsAdminLoginOpen(false);
    setIsAdminOpen(true);
  };
  
  const handleAdminClose = () => setIsAdminOpen(false);
  const handleAdminLoginClose = () => setIsAdminLoginOpen(false);

  const handleProductUpdate = (updatedProduct: Product) => {
    // In a real app, this would update the product in your database
    console.log('Product updated:', updatedProduct);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu}
          onCartOpen={handleCartOpen}
          onAdminOpen={handleAdminOpen}
        />
        
        <main>
          <HeroSection />
          <WhatMakesUsDifferentSection />
          <ProductsSection onProductSelect={handleProductSelect} />
          
          <COASection />
          
          {/* Disclaimer Section */}
          <section id="disclaimer" className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Disclaimer</h3>
                <p className="text-gray-700 leading-relaxed">
                  All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.
                </p>
              </div>
            </div>
          </section>
          
          <AboutUsSection />
          <PaymentOptionsSection />
          <FAQSection />
          <RefundPolicySection />
          <ShippingPolicySection />
          <ContactSection />
        </main>
        
        <Footer />
        
        {/* Modals */}
        {selectedProduct && (
          <ProductPage
            product={selectedProduct}
            onClose={handleProductClose}
            onProductUpdate={handleProductUpdate}
          />
        )}
        
        <ShoppingCart
          isOpen={isCartOpen}
          onClose={handleCartClose}
          onCheckout={handleCheckoutOpen}
        />

        <Checkout
          isOpen={isCheckoutOpen}
          onClose={handleCheckoutClose}
          onBack={handleBackToCart}
        />

        {isAdminLoginOpen && (
          <AdminLogin
            onLogin={handleAdminLogin}
            onClose={handleAdminLoginClose}
          />
        )}
        
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={handleAdminClose}
        />
      </div>
    </CartProvider>
  );
}

export default App;