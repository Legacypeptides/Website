import { supabase } from '../lib/supabase';
import { Product } from '../types/database';

export interface ProductUpsell {
  id: string;
  product_id: string;
  upsell_product_id: string;
  upsell_type: 'upsell' | 'cross_sell' | 'bundle';
  discount_percentage: number;
  position: number;
  created_at: string;
  upsell_product?: Product;
}

export const upsellService = {
  async getUpsells(productId: string): Promise<ProductUpsell[]> {
    const { data, error } = await supabase
      .from('product_upsells')
      .select(`
        *,
        upsell_product:upsell_product_id(*)
      `)
      .eq('product_id', productId)
      .order('position', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getCrossSells(productId: string): Promise<ProductUpsell[]> {
    const { data, error } = await supabase
      .from('product_upsells')
      .select(`
        *,
        upsell_product:upsell_product_id(*)
      `)
      .eq('product_id', productId)
      .eq('upsell_type', 'cross_sell')
      .order('position', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getFrequentlyBoughtTogether(productId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        product_id,
        order_id
      `)
      .eq('product_id', productId)
      .limit(100);

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const orderIds = [...new Set(data.map(item => item.order_id))];

    const { data: relatedItems, error: relatedError } = await supabase
      .from('order_items')
      .select('product_id')
      .in('order_id', orderIds)
      .neq('product_id', productId);

    if (relatedError) throw relatedError;
    if (!relatedItems) return [];

    const productCounts: Record<string, number> = {};
    relatedItems.forEach(item => {
      productCounts[item.product_id] = (productCounts[item.product_id] || 0) + 1;
    });

    const topProducts = Object.entries(productCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([productId]) => productId);

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .in('id', topProducts)
      .eq('status', 'active');

    if (productsError) throw productsError;
    return products || [];
  },

  async createUpsell(upsell: Omit<ProductUpsell, 'id' | 'created_at'>): Promise<ProductUpsell> {
    const { data, error } = await supabase
      .from('product_upsells')
      .insert(upsell)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
