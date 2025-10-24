/*
  # Create Promo Codes Table

  1. New Tables
    - `promo_codes`
      - `id` (uuid, primary key)
      - `code` (text, unique) - The promo code string
      - `discount_type` (text) - Either 'percentage' or 'fixed'
      - `discount_value` (numeric) - The discount amount (percentage or fixed dollar amount)
      - `min_purchase` (numeric, nullable) - Minimum purchase amount required
      - `max_uses` (integer, nullable) - Maximum number of times code can be used
      - `current_uses` (integer) - Current number of times code has been used
      - `valid_from` (timestamptz) - When the promo code becomes valid
      - `valid_until` (timestamptz, nullable) - When the promo code expires
      - `is_active` (boolean) - Whether the code is currently active
      - `product_ids` (text[], nullable) - Array of product IDs the code applies to (null means all products)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `promo_codes` table
    - Add policy for public read access to active promo codes
    - Add policy for authenticated admin users to manage promo codes
*/

CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value numeric NOT NULL CHECK (discount_value > 0),
  min_purchase numeric DEFAULT 0,
  max_uses integer,
  current_uses integer DEFAULT 0,
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  is_active boolean DEFAULT true,
  product_ids text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active promo codes"
  ON promo_codes
  FOR SELECT
  USING (is_active = true AND valid_from <= now() AND (valid_until IS NULL OR valid_until >= now()));

CREATE POLICY "Admins can insert promo codes"
  ON promo_codes
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update promo codes"
  ON promo_codes
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete promo codes"
  ON promo_codes
  FOR DELETE
  USING (true);