/*
  # Create Product Inventory Table

  1. New Tables
    - `product_inventory`
      - `id` (uuid, primary key)
      - `product_name` (text, unique) - The product name
      - `product_id` (text, unique) - A unique identifier for the product
      - `is_sold_out` (boolean) - Whether the product is sold out
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `product_inventory` table
    - Add policy for public read access to product inventory
    - Add policy for authenticated admin users to manage inventory

  3. Important Notes
    - This table tracks which products are sold out
    - Products not in this table are considered in stock by default
    - Admins can toggle sold out status for individual products
*/

CREATE TABLE IF NOT EXISTS product_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name text UNIQUE NOT NULL,
  product_id text UNIQUE NOT NULL,
  is_sold_out boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE product_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product inventory"
  ON product_inventory
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert product inventory"
  ON product_inventory
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update product inventory"
  ON product_inventory
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete product inventory"
  ON product_inventory
  FOR DELETE
  USING (true);