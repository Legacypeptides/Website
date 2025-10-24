import { supabase } from '../lib/supabase';

export interface Refund {
  id: string;
  order_id: string;
  refund_number: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'processed' | 'rejected';
  restock_items: boolean;
  refund_items: RefundItem[];
  notes: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface RefundItem {
  order_item_id: string;
  product_name: string;
  quantity: number;
  refund_amount: number;
}

export interface Return {
  id: string;
  order_id: string;
  return_number: string;
  status: 'requested' | 'approved' | 'received' | 'refunded' | 'rejected';
  reason: string;
  return_items: ReturnItem[];
  return_tracking: string;
  refund_id?: string;
  notes: string;
  requested_at: string;
  approved_at?: string;
  received_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ReturnItem {
  order_item_id: string;
  product_name: string;
  quantity: number;
  reason: string;
}

export const refundService = {
  async createRefund(data: {
    order_id: string;
    amount: number;
    reason: string;
    refund_items: RefundItem[];
    restock_items?: boolean;
    notes?: string;
  }): Promise<Refund> {
    const { data: refundNumber, error: numberError } = await supabase
      .rpc('generate_refund_number');

    if (numberError) throw numberError;

    const { data: refund, error } = await supabase
      .from('refunds')
      .insert({
        order_id: data.order_id,
        refund_number: refundNumber,
        amount: data.amount,
        reason: data.reason,
        status: 'pending',
        restock_items: data.restock_items !== false,
        refund_items: data.refund_items,
        notes: data.notes || ''
      })
      .select()
      .single();

    if (error) throw error;
    return refund;
  },

  async getRefund(refundId: string): Promise<Refund | null> {
    const { data, error } = await supabase
      .from('refunds')
      .select('*')
      .eq('id', refundId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getOrderRefunds(orderId: string): Promise<Refund[]> {
    const { data, error } = await supabase
      .from('refunds')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateRefundStatus(
    refundId: string,
    status: Refund['status'],
    notes?: string
  ): Promise<void> {
    const updates: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (status === 'processed') {
      updates.processed_at = new Date().toISOString();
    }

    if (notes) {
      updates.notes = notes;
    }

    const { error } = await supabase
      .from('refunds')
      .update(updates)
      .eq('id', refundId);

    if (error) throw error;

    if (status === 'processed') {
      const { data: refund } = await supabase
        .from('refunds')
        .select('order_id, restock_items, refund_items')
        .eq('id', refundId)
        .single();

      if (refund?.restock_items && refund.refund_items) {
        await this.restockItems(refund.refund_items);
      }
    }
  },

  async restockItems(items: RefundItem[]): Promise<void> {
    for (const item of items) {
      const { data: orderItem } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('id', item.order_item_id)
        .single();

      if (orderItem) {
        await supabase
          .from('products')
          .update({
            inventory_quantity: supabase.raw(`inventory_quantity + ${item.quantity}`)
          })
          .eq('id', orderItem.product_id);
      }
    }
  },

  async getAllRefunds(limit = 100): Promise<Refund[]> {
    const { data, error } = await supabase
      .from('refunds')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};

export const returnService = {
  async createReturn(data: {
    order_id: string;
    reason: string;
    return_items: ReturnItem[];
    notes?: string;
  }): Promise<Return> {
    const { data: returnNumber, error: numberError } = await supabase
      .rpc('generate_return_number');

    if (numberError) throw numberError;

    const { data: returnData, error } = await supabase
      .from('returns')
      .insert({
        order_id: data.order_id,
        return_number: returnNumber,
        status: 'requested',
        reason: data.reason,
        return_items: data.return_items,
        notes: data.notes || '',
        requested_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return returnData;
  },

  async getReturn(returnId: string): Promise<Return | null> {
    const { data, error } = await supabase
      .from('returns')
      .select('*')
      .eq('id', returnId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getOrderReturns(orderId: string): Promise<Return[]> {
    const { data, error } = await supabase
      .from('returns')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateReturnStatus(
    returnId: string,
    status: Return['status'],
    notes?: string
  ): Promise<void> {
    const updates: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (status === 'approved') {
      updates.approved_at = new Date().toISOString();
    } else if (status === 'received') {
      updates.received_at = new Date().toISOString();
    }

    if (notes) {
      updates.notes = notes;
    }

    const { error } = await supabase
      .from('returns')
      .update(updates)
      .eq('id', returnId);

    if (error) throw error;
  },

  async addReturnTracking(returnId: string, trackingNumber: string): Promise<void> {
    const { error } = await supabase
      .from('returns')
      .update({
        return_tracking: trackingNumber,
        updated_at: new Date().toISOString()
      })
      .eq('id', returnId);

    if (error) throw error;
  },

  async getAllReturns(limit = 100): Promise<Return[]> {
    const { data, error } = await supabase
      .from('returns')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};
