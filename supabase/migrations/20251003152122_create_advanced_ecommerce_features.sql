/*
  # Create Advanced Ecommerce Features

  ## Overview
  This migration adds upsells, tax calculation, order tracking, refunds, and returns.

  ## New Tables
  1. product_upsells - Product recommendations
  2. tax_rates - Location-based tax rates
  3. order_tracking - Shipment tracking
  4. shipping_labels - Shipping label management
  5. refunds - Refund processing
  6. returns - Return management

  ## Security
  - RLS enabled on all tables
  - Appropriate policies for customer and admin access
*/

-- Product Upsells table
CREATE TABLE IF NOT EXISTS product_upsells (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  upsell_product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  upsell_type text DEFAULT 'cross_sell',
  discount_percentage decimal(5,2) DEFAULT 0,
  position integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tax Rates table
CREATE TABLE IF NOT EXISTS tax_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL DEFAULT 'US',
  state text DEFAULT '',
  city text DEFAULT '',
  zip_code text DEFAULT '',
  tax_rate decimal(5,4) NOT NULL,
  tax_name text DEFAULT 'Sales Tax',
  priority integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order Tracking table
CREATE TABLE IF NOT EXISTS order_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  tracking_number text NOT NULL,
  carrier text NOT NULL,
  carrier_service text DEFAULT '',
  tracking_url text DEFAULT '',
  status text DEFAULT 'pre_transit',
  shipped_at timestamptz,
  delivered_at timestamptz,
  estimated_delivery timestamptz,
  tracking_events jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Shipping Labels table
CREATE TABLE IF NOT EXISTS shipping_labels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  tracking_id uuid REFERENCES order_tracking(id),
  label_url text DEFAULT '',
  label_data jsonb DEFAULT '{}'::jsonb,
  carrier text NOT NULL,
  service text DEFAULT '',
  cost decimal(10,2) DEFAULT 0,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Refunds table
CREATE TABLE IF NOT EXISTS refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  refund_number text UNIQUE NOT NULL,
  amount decimal(10,2) NOT NULL,
  reason text DEFAULT '',
  status text DEFAULT 'pending',
  restock_items boolean DEFAULT true,
  refund_items jsonb DEFAULT '[]'::jsonb,
  notes text DEFAULT '',
  processed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Returns table
CREATE TABLE IF NOT EXISTS returns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  return_number text UNIQUE NOT NULL,
  status text DEFAULT 'requested',
  reason text DEFAULT '',
  return_items jsonb DEFAULT '[]'::jsonb,
  return_tracking text DEFAULT '',
  refund_id uuid REFERENCES refunds(id),
  notes text DEFAULT '',
  requested_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  received_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE product_upsells ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view product upsells" ON product_upsells FOR SELECT USING (true);
CREATE POLICY "Anyone can view tax rates" ON tax_rates FOR SELECT USING (is_active = true);
CREATE POLICY "Customers can view own order tracking" ON order_tracking FOR SELECT TO authenticated USING (
  order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE email = current_setting('request.jwt.claims', true)::json->>'email'))
);
CREATE POLICY "Customers can view own refunds" ON refunds FOR SELECT TO authenticated USING (
  order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE email = current_setting('request.jwt.claims', true)::json->>'email'))
);
CREATE POLICY "Customers can view own returns" ON returns FOR SELECT TO authenticated USING (
  order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE email = current_setting('request.jwt.claims', true)::json->>'email'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_product_upsells_product_id ON product_upsells(product_id);
CREATE INDEX IF NOT EXISTS idx_tax_rates_location ON tax_rates(country, state, city, zip_code);
CREATE INDEX IF NOT EXISTS idx_order_tracking_order_id ON order_tracking(order_id);
CREATE INDEX IF NOT EXISTS idx_refunds_order_id ON refunds(order_id);
CREATE INDEX IF NOT EXISTS idx_returns_order_id ON returns(order_id);

-- Functions
CREATE OR REPLACE FUNCTION generate_refund_number() RETURNS text AS $$
BEGIN
  RETURN 'RF-' || (COALESCE((SELECT MAX(CAST(SUBSTRING(refund_number FROM '[0-9]+') AS integer)) FROM refunds), 1000) + 1)::text;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_return_number() RETURNS text AS $$
BEGIN
  RETURN 'RN-' || (COALESCE((SELECT MAX(CAST(SUBSTRING(return_number FROM '[0-9]+') AS integer)) FROM returns), 1000) + 1)::text;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_tax_rate(p_country text, p_state text, p_city text DEFAULT '', p_zip_code text DEFAULT '') RETURNS decimal AS $$
BEGIN
  RETURN COALESCE((
    SELECT tr.tax_rate FROM tax_rates tr
    WHERE tr.is_active = true AND tr.country = p_country
      AND (tr.state = p_state OR tr.state = '')
      AND (tr.city = p_city OR tr.city = '')
      AND (tr.zip_code = p_zip_code OR tr.zip_code = '')
    ORDER BY 
      CASE WHEN tr.zip_code != '' THEN 4 ELSE 0 END +
      CASE WHEN tr.city != '' THEN 3 ELSE 0 END +
      CASE WHEN tr.state != '' THEN 2 ELSE 0 END +
      CASE WHEN tr.country != '' THEN 1 ELSE 0 END DESC,
      tr.priority DESC
    LIMIT 1
  ), 0.00);
END;
$$ LANGUAGE plpgsql;

-- Insert default tax rates
INSERT INTO tax_rates (country, state, tax_rate, tax_name, priority) VALUES
  ('US', 'CA', 0.0725, 'California Sales Tax', 10),
  ('US', 'TX', 0.0625, 'Texas Sales Tax', 10),
  ('US', 'NY', 0.0400, 'New York Sales Tax', 10),
  ('US', 'FL', 0.0600, 'Florida Sales Tax', 10),
  ('US', 'IL', 0.0625, 'Illinois Sales Tax', 10),
  ('US', 'PA', 0.0600, 'Pennsylvania Sales Tax', 10),
  ('US', 'OH', 0.0575, 'Ohio Sales Tax', 10),
  ('US', 'GA', 0.0400, 'Georgia Sales Tax', 10),
  ('US', 'NC', 0.0475, 'North Carolina Sales Tax', 10),
  ('US', 'MI', 0.0600, 'Michigan Sales Tax', 10),
  ('US', '', 0.0800, 'Default US Tax', 1)
ON CONFLICT DO NOTHING;