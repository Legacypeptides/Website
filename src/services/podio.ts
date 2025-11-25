/**
 * Podio Integration Service
 * Sends order data to Podio app when an order is placed
 */

interface PodioOrderData {
  order_number: string;
  order_date: string;
  payment_method: string;
  customer: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: Array<{
    product: string;
    strength?: string;
    safecode?: string;
    quantity: number;
    price: number;
  }>;
  order_total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  promo_code?: string | null;
}

/**
 * Send order data to Podio via Make.com webhook
 * This uses the Make.com webhook URL configured in environment variables
 */
export const sendOrderToPodio = async (orderData: PodioOrderData): Promise<boolean> => {
  try {
    // Get webhook URL from environment variable or use hardcoded fallback
    const hardcodedWebhookUrl = "https://hook.us2.make.com/1n77klxoerm2kiog2jzznc4tn5lhoott";
    const podioWebhookUrl = import.meta.env.VITE_PODIO_WEBHOOK_URL || hardcodedWebhookUrl;

    // Use the webhook approach (Make.com will handle Podio integration)
    return await sendOrderToPodioViaWebhook(orderData, podioWebhookUrl);

  } catch (error) {
    console.error('Error sending order to Podio:', error);
    return false;
  }
};

/**
 * Alternative: Send via webhook URL (if you set up a Zapier/Make.com integration)
 */
export const sendOrderToPodioViaWebhook = async (orderData: PodioOrderData, webhookUrl: string): Promise<boolean> => {
  try {
    // Format items as a readable string for Podio
    const productsText = orderData.items
      .map(item => {
        const strength = item.strength ? ` (${item.strength})` : '';
        const safecode = item.safecode ? ` [${item.safecode}]` : '';
        return `${item.product}${strength}${safecode} - Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}`;
      })
      .join('\n');

    // Format shipping address as a single string
    const fullAddress = [
      orderData.customer.street,
      orderData.customer.apartment,
      `${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zip}`,
      orderData.customer.country
    ].filter(Boolean).join('\n');

    // Create payload with simplified, flat structure for Make.com
    // Make.com webhooks work best with simple, top-level field names
    const webhookPayload = {
      // ========================================
      // PRIMARY PODIO FIELDS (Map these first)
      // Simple, flat structure for Make.com
      // ========================================
      orderID: orderData.order_number,           // Map to "Order ID" in Podio
      orderNumber: orderData.order_number,       // Alternative name
      customerName: `${orderData.customer.first_name} ${orderData.customer.last_name}`, // Map to "Customer Name"
      customerEmail: orderData.customer.email,   // Map to "Customer Email"
      totalAmount: orderData.order_total,        // Map to "Total Amount"
      productsInOrder: productsText,             // Map to "Products in Order" (formatted text)

      // ========================================
      // CHECKOUT FORM FIELDS (From user input)
      // ========================================
      // Contact Information
      email: orderData.customer.email,           // Email Address field
      phone: orderData.customer.phone,           // Phone Number field

      // Customer Name (split)
      firstName: orderData.customer.first_name,  // First Name field
      lastName: orderData.customer.last_name,    // Last Name field

      // Shipping Address
      street: orderData.customer.street,         // Street Address field
      apartment: orderData.customer.apartment || '', // Apartment/suite field (optional)
      city: orderData.customer.city,             // City field
      state: orderData.customer.state,           // State field
      zipCode: orderData.customer.zip,           // ZIP Code field
      zip: orderData.customer.zip,               // Alternative name
      country: orderData.customer.country,       // Country field (defaults to "United States")

      // ========================================
      // FORMATTED/COMBINED FIELDS (Ready to use)
      // ========================================
      shippingAddress: fullAddress,              // Full formatted address (multi-line)
      customerPhone: orderData.customer.phone,   // Alternative phone field name
      orderTotal: orderData.order_total,         // Alternative total field name
      orderItems: productsText,                  // Alternative products field name

      // Address components with "shipping" prefix (for clarity)
      shippingStreet: orderData.customer.street,
      shippingApartment: orderData.customer.apartment || '',
      shippingCity: orderData.customer.city,
      shippingState: orderData.customer.state,
      shippingZip: orderData.customer.zip,
      shippingCountry: orderData.customer.country,

      // ========================================
      // ORDER FINANCIAL DETAILS
      // ========================================
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      shippingCost: orderData.shipping,          // Alternative name
      tax: orderData.tax,
      discount: orderData.discount,
      promoCode: orderData.promo_code || '',

      // ========================================
      // PAYMENT & ORDER DETAILS
      // ========================================
      paymentMethod: orderData.payment_method,   // RELAY, CASHAPP, or ZELLE
      orderDate: orderData.order_date,           // ISO timestamp
      orderDateFormatted: new Date(orderData.order_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),

      // ========================================
      // PRODUCT/ITEMS DATA
      // ========================================
      items: orderData.items,                    // Full items array
      itemsCount: orderData.items.length,        // Number of items

      // ========================================
      // NESTED STRUCTURE (For advanced Make.com mapping)
      // Access via customer.email, customer.first_name, etc.
      // ========================================
      customer: {
        email: orderData.customer.email,
        first_name: orderData.customer.first_name,
        last_name: orderData.customer.last_name,
        phone: orderData.customer.phone,
        street: orderData.customer.street,
        apartment: orderData.customer.apartment || '',
        city: orderData.customer.city,
        state: orderData.customer.state,
        zip: orderData.customer.zip,
        country: orderData.customer.country
      }
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    });

    if (!response.ok) {
      console.error('Podio webhook failed:', response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending order to Podio webhook:', error);
    return false;
  }
};

