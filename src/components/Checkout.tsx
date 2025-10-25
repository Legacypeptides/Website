import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, ArrowLeft, ShoppingBag, Lock, CircleCheck as CheckCircle, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { useCart } from './CartProvider';
import { supabase } from '../lib/supabase';
import { ThankYou } from './ThankYou';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, onBack }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'confirmation'>('info');
  const [selectedPayment, setSelectedPayment] = useState<'relay' | 'cashapp' | 'zelle'>('relay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showRelayDetails, setShowRelayDetails] = useState(false);
  const [showCashAppDetails, setShowCashAppDetails] = useState(false);
  const [showZelleDetails, setShowZelleDetails] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState('');

  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setPromoError('');

    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', promoCode.toUpperCase())
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      setPromoError('Invalid promo code');
      return;
    }

    const now = new Date();
    const validFrom = new Date(data.valid_from);
    const validUntil = data.valid_until ? new Date(data.valid_until) : null;

    if (now < validFrom) {
      setPromoError('This promo code is not yet valid');
      return;
    }

    if (validUntil && now > validUntil) {
      setPromoError('This promo code has expired');
      return;
    }

    if (data.max_uses && data.current_uses >= data.max_uses) {
      setPromoError('This promo code has reached its usage limit');
      return;
    }

    if (data.min_purchase && cartTotal < data.min_purchase) {
      setPromoError(`Minimum purchase of $${data.min_purchase} required`);
      return;
    }

    setAppliedPromo(data);
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;

    if (appliedPromo.discount_type === 'percentage') {
      return (cartTotal * appliedPromo.discount_value) / 100;
    } else {
      return appliedPromo.discount_value;
    }
  };

  const freeGiftItem = {
    id: 'free-gift-bac-water-3ml',
    name: 'BACTERIOSTATIC WATER 3ML',
    price: 0,
    quantity: 1,
    image: 'BACTERIOSTATIC WATER 3ML.png',
    category: 'Free Gift',
    safeCode: 'FREE-GIFT'
  };

  const displayCartItems = cartItems.length > 0 ? [...cartItems, freeGiftItem] : [];

  const subtotal = cartTotal;
  const shipping = 0;
  const tax = 0;
  const discount = calculateDiscount();
  const total = Math.max(0, subtotal + shipping + tax - discount);

  const getProductStrength = (name: string, price: number): string => {
    const strengthMap: Record<string, Record<number, string>> = {
      'GHK-CU': { 49.95: '50mg', 69.95: '100mg' },
      'GLP-1 (S)': { 59.95: '5mg', 99.95: '10mg', 149.95: '15mg' },
      'GLP-2 (T)': { 59.95: '5mg', 99.95: '10mg', 149.95: '15mg' },
      'GLP-3 (RETA)': { 59.95: '5mg', 99.95: '10mg' },
      'CAGRILINTIDE': { 59.95: '5mg', 119.95: '10mg' }
    };
    return strengthMap[name]?.[price] || '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Generate unique order number from database
      const { data: orderNumberData, error: orderNumberError } = await supabase
        .rpc('generate_order_number');

      if (orderNumberError) throw orderNumberError;

      const newOrderNumber = orderNumberData;
      setOrderNumber(newOrderNumber);

      const orderItems = [
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
      ];

      // Save order to database
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: newOrderNumber,
          email: customerInfo.email,
          financial_status: 'pending',
          fulfillment_status: 'unfulfilled',
          subtotal: parseFloat(subtotal.toFixed(2)),
          shipping: parseFloat(shipping.toFixed(2)),
          tax: parseFloat(tax.toFixed(2)),
          discount: parseFloat(discount.toFixed(2)),
          total: parseFloat(total.toFixed(2)),
          currency: 'USD',
          shipping_address: {
            first_name: customerInfo.firstName,
            last_name: customerInfo.lastName,
            phone: customerInfo.phone,
            street: customerInfo.street,
            apartment: customerInfo.apartment || '',
            city: customerInfo.city,
            state: customerInfo.state,
            zip: customerInfo.zipCode,
            country: customerInfo.country
          },
          billing_address: {
            first_name: customerInfo.firstName,
            last_name: customerInfo.lastName,
            phone: customerInfo.phone,
            street: customerInfo.street,
            apartment: customerInfo.apartment || '',
            city: customerInfo.city,
            state: customerInfo.state,
            zip: customerInfo.zipCode,
            country: customerInfo.country
          },
          metadata: {
            payment_method: selectedPayment,
            promo_code: appliedPromo ? appliedPromo.code : null,
            items: orderItems
          }
        });

      if (orderError) throw orderError;

      // Send to Make webhook
      const orderData = {
        order_number: newOrderNumber,
        order_date: new Date().toISOString(),
        payment_method: selectedPayment.toUpperCase(),
        customer: {
          email: customerInfo.email,
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          phone: customerInfo.phone,
          street: customerInfo.street,
          apartment: customerInfo.apartment,
          city: customerInfo.city,
          state: customerInfo.state,
          zip: customerInfo.zipCode,
          country: customerInfo.country
        },
        items: orderItems,
        order_total: parseFloat(total.toFixed(2)),
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        promo_code: appliedPromo ? appliedPromo.code : null
      };

      await fetch('https://hook.us2.make.com/mznh6c4jkui0dlry9r2ojydxfwernd2n', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (appliedPromo) {
        await supabase
          .from('promo_codes')
          .update({ current_uses: appliedPromo.current_uses + 1 })
          .eq('id', appliedPromo.id);
      }

      setTimeout(() => {
        setIsProcessing(false);
        setStep('confirmation');
        clearCart();
      }, 2000);
    } catch (error) {
      console.error('Order submission error:', error);
      setIsProcessing(false);
      alert('There was an error processing your order. Please try again.');
    }
  };

  const handleCloseCheckout = () => {
    setStep('info');
    setCustomerInfo({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {step === 'confirmation' ? (
          <ThankYou
            orderNumber={orderNumber}
            paymentMethod={selectedPayment}
            customerEmail={customerInfo.email}
            onClose={handleCloseCheckout}
          />
        ) : (
          <>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                {step === 'payment' && (
                  <button
                    onClick={() => setStep('info')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={24} />
                  </button>
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {step === 'info' ? 'Shipping Information' : 'Payment Method'}
                </h2>
              </div>
              <button
                onClick={handleCloseCheckout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-6">
              <div className="space-y-6">
                {step === 'info' ? (
                  <form onSubmit={handleContinueToPayment} className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={customerInfo.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={customerInfo.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="(555) 123-4567"
                          />
                          <p className="mt-2 text-xs text-gray-600">
                            Your phone number may be used for communication regarding your order ONLY.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={customerInfo.firstName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={customerInfo.lastName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            name="street"
                            value={customerInfo.street}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="123 Main St"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Apartment, suite, etc. (optional)
                          </label>
                          <input
                            type="text"
                            name="apartment"
                            value={customerInfo.apartment}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Apt 4B"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={customerInfo.city}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              State *
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={customerInfo.state}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              placeholder="CA"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              ZIP Code *
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={customerInfo.zipCode}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              placeholder="90210"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Country *
                            </label>
                            <select
                              name="country"
                              value={customerInfo.country}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                              <option value="United States">United States</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                    >
                      Continue to Payment
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                      <div className="space-y-3 text-sm text-gray-700">
                        <p>
                          We securely process payments through Relay ACH, Cash App Business, or Zelle Business — all trusted and verified systems.
                          These direct payment methods let us keep pricing low while maintaining full verification and accountability.
                        </p>
                        <p>
                          After selecting your preferred payment method below, you'll see step-by-step instructions on the next page after checkout.
                        </p>
                        <p className="flex items-start gap-2 text-amber-700 font-medium">
                          <span>⚠️</span>
                          <span>Orders not paid within 24 hours are automatically canceled to keep inventory accurate.</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Secure Payment Options</h3>
                      <div className="space-y-3">
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPayment('relay');
                              setShowRelayDetails(!showRelayDetails);
                            }}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                              selectedPayment === 'relay'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPayment === 'relay' ? 'border-blue-600' : 'border-gray-300'
                            }`}>
                              {selectedPayment === 'relay' && (
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                              )}
                            </div>
                            <Building2 className="text-gray-600" size={24} />
                            <div className="flex-1 text-left">
                              <div className="font-semibold text-gray-900">Relay ACH Invoice</div>
                              <div className="text-sm text-gray-600">Pay via business invoice</div>
                            </div>
                            {selectedPayment === 'relay' && (
                              showRelayDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                            )}
                          </button>

                          {selectedPayment === 'relay' && showRelayDetails && (
                            <div className="mt-3 p-4 bg-white border border-blue-200 rounded-lg text-sm text-gray-700 space-y-2">
                              <p>
                                Professional invoice will be emailed at <strong>6:00 PM EST (Mon–Sat)</strong>.
                              </p>
                              <p>
                                You can pay directly through your bank using ACH or debit account — fast, secure, and fully traceable.
                              </p>
                              <p className="text-gray-600 italic">
                                (Ideal for customers who prefer official invoicing.)
                              </p>
                            </div>
                          )}
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPayment('cashapp');
                              setShowCashAppDetails(!showCashAppDetails);
                            }}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                              selectedPayment === 'cashapp'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPayment === 'cashapp' ? 'border-blue-600' : 'border-gray-300'
                            }`}>
                              {selectedPayment === 'cashapp' && (
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                              )}
                            </div>
                            <Smartphone className="text-gray-600" size={24} />
                            <div className="flex-1 text-left">
                              <div className="font-semibold text-gray-900">CashApp Business</div>
                              <div className="text-sm text-gray-600">Pay with CashApp</div>
                            </div>
                            {selectedPayment === 'cashapp' && (
                              showCashAppDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                            )}
                          </button>

                          {selectedPayment === 'cashapp' && showCashAppDetails && (
                            <div className="mt-3 p-4 bg-white border border-blue-200 rounded-lg text-sm text-gray-700 space-y-2">
                              <p>
                                After checkout, you'll see our Cash App Business payment instructions.
                              </p>
                              <p className="text-red-600 font-semibold">
                                Please complete payment within 24 hours to avoid automatic cancellation.
                              </p>
                            </div>
                          )}
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPayment('zelle');
                              setShowZelleDetails(!showZelleDetails);
                            }}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                              selectedPayment === 'zelle'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPayment === 'zelle' ? 'border-blue-600' : 'border-gray-300'
                            }`}>
                              {selectedPayment === 'zelle' && (
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                              )}
                            </div>
                            <CreditCard className="text-gray-600" size={24} />
                            <div className="flex-1 text-left">
                              <div className="font-semibold text-gray-900">Zelle Business</div>
                              <div className="text-sm text-gray-600">Pay with Zelle transfer</div>
                            </div>
                            {selectedPayment === 'zelle' && (
                              showZelleDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                            )}
                          </button>

                          {selectedPayment === 'zelle' && showZelleDetails && (
                            <div className="mt-3 p-4 bg-white border border-blue-200 rounded-lg text-sm text-gray-700 space-y-2">
                              <p>
                                Send your payment safely through Legacy Peptides official Zelle Business network — no third-party processor or card fees.
                              </p>
                              <p>
                                After you complete checkout, full payment instructions will appear on the next page.
                              </p>
                              <p>
                                Please include only your <strong>Order Number</strong> in the memo — no other text or emojis.
                              </p>
                              <p className="text-red-600 font-semibold">
                                Orders not paid within 24 hours will be automatically canceled to keep inventory accurate.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                      <Lock className="text-blue-600 flex-shrink-0" size={20} />
                      <div className="text-sm text-blue-900">
                        <div className="font-semibold mb-1">Secure Payment</div>
                        <div>Your payment information is encrypted and secure. We never store your payment details.</div>
                      </div>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock size={20} />
                          Place Order
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBag size={20} />
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    {displayCartItems.map((item) => (
                      <div key={`${item.id}-${item.price}`} className={`flex gap-4 ${item.id === 'free-gift-bac-water-3ml' ? 'bg-green-50 p-3 rounded-lg border border-green-200' : ''}`}>
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                            {item.id === 'free-gift-bac-water-3ml' && (
                              <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">FREE</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {item.id === 'free-gift-bac-water-3ml' ? (
                              <span>3ml • Qty: 1</span>
                            ) : (
                              <>
                                {getProductStrength(item.name, item.price) && (
                                  <span>{getProductStrength(item.name, item.price)} • </span>
                                )}
                                Qty: {item.quantity}
                              </>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${item.id === 'free-gift-bac-water-3ml' ? 'text-green-600' : 'text-gray-900'}`}>
                            {item.id === 'free-gift-bac-water-3ml' ? 'FREE' : `$${(item.price * item.quantity).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-300 pt-4 space-y-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Have a promo code?
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                            placeholder="Enter code"
                            disabled={!!appliedPromo}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                          />
                        </div>
                        {appliedPromo ? (
                          <button
                            type="button"
                            onClick={removePromoCode}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <Tag size={16} />
                            Apply
                          </button>
                        )}
                      </div>
                      {promoError && (
                        <p className="text-sm text-red-600">{promoError}</p>
                      )}
                      {appliedPromo && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm text-green-800 font-semibold">
                            ✓ Promo code "{appliedPromo.code}" applied!
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            {appliedPromo.discount_type === 'percentage'
                              ? `${appliedPromo.discount_value}% off`
                              : `$${appliedPromo.discount_value} off`}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Shipping</span>
                        <span className="text-green-600 font-semibold">FREE</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Tax Included</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-700 font-semibold">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
