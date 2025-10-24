import { supabase } from '../lib/supabase';

export interface OrderTracking {
  id: string;
  order_id: string;
  tracking_number: string;
  carrier: string;
  carrier_service: string;
  tracking_url: string;
  status: 'pre_transit' | 'in_transit' | 'delivered' | 'failed';
  shipped_at?: string;
  delivered_at?: string;
  estimated_delivery?: string;
  tracking_events: TrackingEvent[];
  created_at: string;
  updated_at: string;
}

export interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

export interface ShippingLabel {
  id: string;
  order_id: string;
  tracking_id?: string;
  label_url: string;
  label_data: Record<string, any>;
  carrier: string;
  service: string;
  cost: number;
  status: 'pending' | 'printed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const trackingService = {
  async createTracking(data: {
    order_id: string;
    tracking_number: string;
    carrier: string;
    carrier_service?: string;
    shipped_at?: string;
    estimated_delivery?: string;
  }): Promise<OrderTracking> {
    const trackingUrl = this.generateTrackingUrl(data.carrier, data.tracking_number);

    const { data: tracking, error } = await supabase
      .from('order_tracking')
      .insert({
        order_id: data.order_id,
        tracking_number: data.tracking_number,
        carrier: data.carrier,
        carrier_service: data.carrier_service || '',
        tracking_url: trackingUrl,
        status: 'pre_transit',
        shipped_at: data.shipped_at || new Date().toISOString(),
        estimated_delivery: data.estimated_delivery,
        tracking_events: []
      })
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('orders')
      .update({
        fulfillment_status: 'fulfilled',
        updated_at: new Date().toISOString()
      })
      .eq('id', data.order_id);

    return tracking;
  },

  async getOrderTracking(orderId: string): Promise<OrderTracking | null> {
    const { data, error } = await supabase
      .from('order_tracking')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateTrackingStatus(
    trackingId: string,
    status: OrderTracking['status'],
    event?: TrackingEvent
  ): Promise<void> {
    const updates: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (status === 'delivered') {
      updates.delivered_at = new Date().toISOString();
    }

    if (event) {
      const { data: currentTracking } = await supabase
        .from('order_tracking')
        .select('tracking_events')
        .eq('id', trackingId)
        .single();

      const events = currentTracking?.tracking_events || [];
      events.push(event);
      updates.tracking_events = events;
    }

    const { error } = await supabase
      .from('order_tracking')
      .update(updates)
      .eq('id', trackingId);

    if (error) throw error;
  },

  generateTrackingUrl(carrier: string, trackingNumber: string): string {
    const carriers: Record<string, string> = {
      'USPS': `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
      'UPS': `https://www.ups.com/track?tracknum=${trackingNumber}`,
      'FedEx': `https://www.fedex.com/fedextrack/?tracknumbers=${trackingNumber}`,
      'DHL': `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
      'Default': `#tracking-${trackingNumber}`
    };

    return carriers[carrier] || carriers['Default'];
  },

  async createShippingLabel(data: {
    order_id: string;
    carrier: string;
    service: string;
    cost: number;
  }): Promise<ShippingLabel> {
    const { data: label, error } = await supabase
      .from('shipping_labels')
      .insert({
        order_id: data.order_id,
        carrier: data.carrier,
        service: data.service,
        cost: data.cost,
        status: 'pending',
        label_url: '',
        label_data: {}
      })
      .select()
      .single();

    if (error) throw error;
    return label;
  },

  async getShippingLabel(orderId: string): Promise<ShippingLabel | null> {
    const { data, error } = await supabase
      .from('shipping_labels')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};
