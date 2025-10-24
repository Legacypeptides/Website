import { supabase } from '../lib/supabase';

export interface TaxRate {
  id: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  tax_rate: number;
  tax_name: string;
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaxCalculation {
  tax_rate: number;
  tax_amount: number;
  tax_name: string;
}

export const taxService = {
  async calculateTax(
    subtotal: number,
    country: string,
    state: string,
    city: string = '',
    zipCode: string = ''
  ): Promise<TaxCalculation> {
    const { data, error } = await supabase.rpc('calculate_tax_rate', {
      p_country: country,
      p_state: state,
      p_city: city,
      p_zip_code: zipCode
    });

    if (error) {
      console.error('Tax calculation error:', error);
      return {
        tax_rate: 0.08,
        tax_amount: subtotal * 0.08,
        tax_name: 'Default Tax'
      };
    }

    const taxRate = data || 0.08;
    const taxAmount = subtotal * taxRate;

    const { data: taxInfo } = await supabase
      .from('tax_rates')
      .select('tax_name')
      .eq('country', country)
      .eq('state', state)
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .limit(1)
      .maybeSingle();

    return {
      tax_rate: taxRate,
      tax_amount: parseFloat(taxAmount.toFixed(2)),
      tax_name: taxInfo?.tax_name || 'Sales Tax'
    };
  },

  async getTaxRate(
    country: string,
    state: string,
    city: string = '',
    zipCode: string = ''
  ): Promise<number> {
    const { data, error } = await supabase.rpc('calculate_tax_rate', {
      p_country: country,
      p_state: state,
      p_city: city,
      p_zip_code: zipCode
    });

    if (error) {
      console.error('Tax rate lookup error:', error);
      return 0.08;
    }

    return data || 0.08;
  },

  async getAllTaxRates(): Promise<TaxRate[]> {
    const { data, error } = await supabase
      .from('tax_rates')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createTaxRate(taxRate: Omit<TaxRate, 'id' | 'created_at' | 'updated_at'>): Promise<TaxRate> {
    const { data, error } = await supabase
      .from('tax_rates')
      .insert(taxRate)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
