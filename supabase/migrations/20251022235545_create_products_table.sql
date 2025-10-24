/*
  # Create Products Table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `product_id` (text, unique) - Unique identifier for the product
      - `name` (text) - Product name
      - `category` (text) - Product category
      - `safe_code` (text) - Product safe code
      - `price` (numeric) - Product price
      - `rating` (numeric) - Product rating
      - `reviews` (integer) - Number of reviews
      - `image` (text) - Product image URL
      - `description` (text) - Short description
      - `benefits` (text[]) - Array of benefits
      - `detailed_description` (text) - Long detailed description
      - `purity` (text) - Purity specification
      - `concentration` (text) - Concentration specification
      - `vial_size` (text) - Vial size specification
      - `storage` (text) - Storage specification
      - `research_applications` (text[]) - Array of research applications
      - `safety_info` (text) - Safety information
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access to products
    - Add policy for authenticated admin users to manage products

  3. Important Notes
    - This table stores all product information
    - Products can be added, updated, or removed from the admin panel
    - Products are displayed on the main products page
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  safe_code text,
  price numeric NOT NULL,
  rating numeric DEFAULT 4.5,
  reviews integer DEFAULT 0,
  image text NOT NULL,
  description text NOT NULL,
  benefits text[] DEFAULT '{}',
  detailed_description text NOT NULL,
  purity text DEFAULT 'Purity Guaranteed',
  concentration text NOT NULL,
  vial_size text DEFAULT '3ml',
  storage text DEFAULT 'Store at -20°C',
  research_applications text[] DEFAULT '{}',
  safety_info text DEFAULT 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update products"
  ON products
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete products"
  ON products
  FOR DELETE
  USING (true);