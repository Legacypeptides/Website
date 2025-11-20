export const sendOrderWebhook = async (orderData: any) => {
  try {
    const webhookPayload = {
      orderNumber: orderData.order_number,
      customerName: `${orderData.customer.first_name} ${orderData.customer.last_name}`,
      email: orderData.customer.email,
      phone: orderData.customer.phone,
      street: orderData.customer.street,
      city: orderData.customer.city,
      state: orderData.customer.state,
      zip: orderData.customer.zip,
      country: orderData.customer.country,
      products: orderData.items.map((item: any) => ({
        name: item.product,
        quantity: item.quantity,
        price: item.price
      })),
      total: orderData.order_total,
      paymentMethod: orderData.payment_method,
      orderDate: orderData.order_date
    };

    const response = await fetch('https://hook.us2.make.com/l914yer7bshfm0qruhh33dmskzkmxc6m', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    });

    if (!response.ok) {
      console.error('Webhook failed:', response.status, response.statusText);
    }

    return response;
  } catch (error) {
    console.error('Error sending webhook:', error);
    throw error;
  }
};
