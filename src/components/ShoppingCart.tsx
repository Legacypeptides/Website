import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart as ShoppingCartIcon, CreditCard, Truck, Shield, User, Mail, MapPin, Phone, Tag } from 'lucide-react';
import { useCart } from './CartProvider';

// Zapier webhook URL
// Simple order storage - in a real app, this would be sent to your backend
const saveOrder = (orderData: any) => {
  // Use a more persistent storage key that won't be cleared easily
  const storageKey = 'legacy_peptides_orders_db';
  const existingOrders = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const newOrder = {
    id: Date.now().toString(),
    orderNumber: `LP-${new Date().getFullYear()}-${String(existingOrders.length + 1).padStart(3, '0')}`,
    customerEmail: orderData.customerData.email,
    customerName: orderData.customerData.fullName,
    items: orderData.items,
    subtotal: orderData.subtotal,
    total: orderData.total,
    status: 'pending',
    orderDate: new Date().toISOString(),
    shippingAddress: {
      street: orderData.customerData.street,
      city: orderData.customerData.city,
      state: orderData.customerData.state,
      zipCode: orderData.customerData.zip,
      country: 'USA'
    },
    customerPhone: orderData.customerData.phone || ''
  };
  
  existingOrders.push(newOrder);
  localStorage.setItem(storageKey, JSON.stringify(existingOrders));
  
  // Also save to a backup location for persistence
  try {
    localStorage.setItem('legacy_orders_backup', JSON.stringify(existingOrders));
  } catch (e) {
    console.warn('Could not save order backup:', e);
  }
  
  return newOrder;
};

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  onCheckout
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerData, setCustomerData] = useState({
    fullName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [discountError, setDiscountError] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const freeGiftItem = {
    id: 'free-gift-bac-water-3ml',
    name: 'BACTERIOSTATIC WATER 3ML',
    price: 0,
    quantity: 1,
    image: 'BACTERIOSTATIC WATER 3ML.png',
    category: 'Free Gift'
  };

  const displayCartItems = cartItems.length > 0 ? [...cartItems, freeGiftItem] : [];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const discountAmount = appliedDiscount?.discountAmount || 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!customerData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!customerData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!customerData.street.trim()) {
      errors.street = 'Street address is required';
    }
    
    if (!customerData.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!customerData.state.trim()) {
      errors.state = 'State is required';
    }
    
    if (!customerData.zip.trim()) {
      errors.zip = 'ZIP code is required';
    }
    
    if (!customerData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      setShowCheckoutForm(true);
    }
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setIsCheckingOut(true);
    
    // CRITICAL: ALWAYS send to Zapier webhook first - this is the primary order processing
    // This must succeed regardless of any other operations
    try {
      // Generate unique order ID
      const orderId = `LP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      
      // Helper function to get product strength
      const getProductStrength = (productName: string, price: number) => {
        switch (productName) {
          case '5-AMINO-1MQ': return '10mg';
          case 'AOD-9604': return '5mg';
          case 'BPC-157 / TB-500': return '5mg / 5mg';
          case 'GLOW': return '70mg';
          case 'BPC-157': return '10mg';
          case 'IPAMORELIN': return '10mg';
          case 'MOTS-C': return '10mg';
          case 'NAD+': return '500mg';
          case 'TESAMORELIN': return '10mg';
          case 'THYMOSIN ALPHA-1': return '10mg';
          case 'CJC-1295 / IPAMORELIN': return '5mg / 5mg';
          case 'DSIP': return '5mg';
          case 'EPITALON': return '10mg';
          case 'GHK-CU': return price === 49.95 ? '50mg' : '100mg';
          case 'GLP-1 (S)': return price === 59.95 ? '5mg' : price === 99.95 ? '10mg' : '15mg';
          case 'GLP-2 (T)': return price === 59.95 ? '5mg' : price === 99.95 ? '10mg' : '15mg';
          case 'GLP-3 (RETA)': return price === 59.95 ? '5mg' : '10mg';
          case 'CAGRILINTIDE': return price === 59.95 ? '5mg' : '10mg';
          case 'KISSPEPTIN': return '10mg';
          case 'MELANOTAN 1': return '10mg';
          case 'MELANOTAN 2': return '10mg';
          case 'PT-141': return '10mg';
          case 'SELANK': return '5mg';
          case 'SEMAX': return '5mg';
          case 'SERMORELIN': return '10mg';
          case 'SLU-PP-332': return '5mg';
          case 'SS-31': return '10mg';
          case 'TB-500': return '10mg';
          case 'TESAMORELIN / IPAMORELIN': return '5mg / 5mg';
          case 'BACTERIOSTATIC WATER': return '10ml';
          default: return '10mg';
        }
      };

      // Prepare webhook data with each product as a separate line item, including free gift
      const webhookData = {
        order_id: orderId,
        customer: {
          name: customerData.fullName,
          email: customerData.email,
          phone: customerData.phone,
          street: customerData.street,
          city: customerData.city,
          state: customerData.state,
          zip: customerData.zip,
          country: "US"
        },
        items: [
          ...cartItems.map(item => ({
            product: item.name,
            strength: getProductStrength(item.name, item.price),
            safecode: item.safeCode || "N/A",
            quantity: item.quantity,
            price: parseFloat(item.price.toFixed(2))
          })),
          {
            product: 'BACTERIOSTATIC WATER',
            strength: '3ml',
            safecode: 'FREE-GIFT',
            quantity: 1,
            price: 0.00
          }
        ],
        order_total: parseFloat(total.toFixed(2))
      };

      // Send to Make.com webhook - THIS IS CRITICAL AND MUST ALWAYS EXECUTE
      await fetch('https://hook.us2.make.com/mznh6c4jkui0dlry9r2ojydxfwernd2n', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });
      
      console.log('✅ SUCCESS: Order data sent to Make.com webhook successfully');
      console.log('📦 Webhook Data:', webhookData);
      
    } catch (error) {
      console.error('🚨 CRITICAL ERROR: Failed to send order to Make.com webhook:', error);
      // Continue with checkout process even if webhook fails
      // But this is a critical issue that needs attention
    }
    
    // Secondary: Save order to local admin system (this is backup/admin functionality)
    // Save order to admin system
    const orderData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      total,
      customerData
    };
    
    let savedOrder;
    try {
      savedOrder = saveOrder(orderData);
      console.log('📋 Admin system: Order saved locally for admin panel');
    } catch (adminError) {
      console.error('⚠️ Warning: Failed to save order to admin system:', adminError);
      // Create a fallback order object for the success message
      savedOrder = {
        orderNumber: orderId
      };
    }
    
    // Simulate checkout process
    globalThis.setTimeout(() => {
      clearCart();
      setShowCheckoutForm(false);
      setCustomerData({
        fullName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
      });
      setFormErrors({});
      setIsCheckingOut(false);
      onClose();
      alert(`Order ${savedOrder.orderNumber} placed successfully! You will receive a confirmation email shortly.`);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <span className="bg-blue-600 text-white rounded-full px-2 py-1 text-sm">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center h-96 px-6">
            <ShoppingCartIcon className="text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 text-center mb-6">
              Add some premium research peptides to get started
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="px-6 py-4 space-y-4">
              {displayCartItems.map((item) => (
                <div key={item.id} className={`rounded-lg p-4 ${item.id === 'free-gift-bac-water-3ml' ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50'}`}>
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        {item.id === 'free-gift-bac-water-3ml' && (
                          <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">FREE GIFT</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      {item.id === 'free-gift-bac-water-3ml' ? (
                        <p className="text-lg font-bold text-green-600">FREE</p>
                      ) : (
                        <p className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>

                  {item.id !== 'free-gift-bac-water-3ml' && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                  {item.id === 'free-gift-bac-water-3ml' && (
                    <div className="mt-4">
                      <p className="text-sm text-green-700 font-medium">Automatically included with every order</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t bg-gray-50 px-6 py-4 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    <span className="text-green-600">FREE 🚚</span>
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Highlight */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <Truck className="text-green-600" size={16} />
                  <span className="text-sm text-green-800 font-semibold">
                    🎉 FREE SHIPPING on all orders!
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="text-center p-2 bg-white rounded-lg">
                  <Shield className="text-green-600 mx-auto mb-1" size={16} />
                  <p className="text-xs text-gray-600">Secure</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <Truck className="text-blue-600 mx-auto mb-1" size={16} />
                  <p className="text-xs text-gray-600">Fast Ship</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <CreditCard className="text-purple-600 mx-auto mb-1" size={16} />
                  <p className="text-xs text-gray-600">Secure Pay</p>
                </div>
              </div>

              {!showCheckoutForm ? (
                /* Proceed to Checkout Button */
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout - ${total.toFixed(2)}
                </button>
              ) : (
                /* Checkout Form */
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Shipping Information</h4>
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={customerData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={customerData.street}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.street ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your street address"
                    />
                    {formErrors.street && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.street}</p>
                    )}
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={customerData.city}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your city"
                      />
                      {formErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={customerData.state}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="State"
                      />
                      {formErrors.state && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={customerData.zip}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.zip ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="ZIP Code"
                      />
                      {formErrors.zip && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.zip}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCheckoutForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-200"
                    >
                      Back to Cart
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-blue-900 py-3 px-6 rounded-lg font-bold hover:from-gold-400 hover:to-gold-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-900"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={16} />
                          Complete Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-3">
                Secure 256-bit SSL encryption. Your payment info is safe.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};