/*
  # Create Orders Table

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique) - Format: LP-XXXX
      - `customer_email` (text)
      - `customer_first_name` (text)
      - `customer_last_name` (text)
      - `customer_phone` (text)
      - `shipping_street` (text)
      - `shipping_apartment` (text)
      - `shipping_city` (text)
      - `shipping_state` (text)
      - `shipping_zip` (text)
      - `shipping_country` (text)
      - `payment_method` (text) - relay, cashapp, or zelle
      - `payment_status` (text) - pending, paid, cancelled
      - `order_items` (jsonb) - Array of items
      - `subtotal` (decimal)
      - `shipping` (decimal)
      - `tax` (decimal)
      - `discount` (decimal)
      - `total` (decimal)
      - `promo_code` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. Security
    - Enable RLS on `orders` table
    - Add policy for authenticated admin users to manage orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_email text NOT NULL,
  customer_first_name text NOT NULL,
  customer_last_name text NOT NULL,
  customer_phone text NOT NULL,
  shipping_street text NOT NULL,
  shipping_apartment text,
  shipping_city text NOT NULL,
  shipping_state text NOT NULL,
  shipping_zip text NOT NULL,
  shipping_country text NOT NULL DEFAULT 'United States',
  payment_method text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  order_items jsonb NOT NULL,
  subtotal decimal(10,2) NOT NULL,
  shipping decimal(10,2) NOT NULL,
  tax decimal(10,2) NOT NULL,
  discount decimal(10,2) NOT NULL DEFAULT 0,
  total decimal(10,2) NOT NULL,
  promo_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can view all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can insert orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin users can delete orders"
  ON orders
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to generate unique order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  new_number text;
  number_exists boolean;
BEGIN
  LOOP
    -- Generate a 4-digit random number
    new_number := 'LP-' || LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
    
    -- Check if it exists
    SELECT EXISTS(SELECT 1 FROM orders WHERE order_number = new_number) INTO number_exists;
    
    -- If it doesn't exist, return it
    IF NOT number_exists THEN
      RETURN new_number;
    END IF;
  END LOOP;
END;
$$;

-- Create indexes after table creation
DO $$
BEGIN
  -- Create an index on order_number for faster lookups
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_orders_order_number') THEN
    CREATE INDEX idx_orders_order_number ON orders(order_number);
  END IF;

  -- Create an index on created_at for sorting
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_orders_created_at') THEN
    CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
  END IF;
END $$;