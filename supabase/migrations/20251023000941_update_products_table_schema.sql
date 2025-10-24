/*
  # Update Products Table Schema

  1. Changes
    - Add missing columns for product management:
      - `product_id` (text) - Unique identifier for frontend
      - `category` (text) - Product category
      - `safe_code` (text) - Product safe code
      - `rating` (numeric) - Product rating
      - `reviews` (integer) - Number of reviews
      - `image` (text) - Product image URL
      - `benefits` (text[]) - Array of benefits
      - `detailed_description` (text) - Long description
      - `concentration` (text) - Strength/concentration
      - `purity` (text) - Purity specification
      - `vial_size` (text) - Vial size
      - `storage` (text) - Storage requirements
      - `research_applications` (text[]) - Research applications
      - `safety_info` (text) - Safety information

  2. Notes
    - Adds columns if they don't exist
    - Preserves existing data
*/

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'product_id') THEN
    ALTER TABLE products ADD COLUMN product_id text UNIQUE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'category') THEN
    ALTER TABLE products ADD COLUMN category text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'safe_code') THEN
    ALTER TABLE products ADD COLUMN safe_code text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating') THEN
    ALTER TABLE products ADD COLUMN rating numeric DEFAULT 4.5;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'reviews') THEN
    ALTER TABLE products ADD COLUMN reviews integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'image') THEN
    ALTER TABLE products ADD COLUMN image text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'benefits') THEN
    ALTER TABLE products ADD COLUMN benefits text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'detailed_description') THEN
    ALTER TABLE products ADD COLUMN detailed_description text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'concentration') THEN
    ALTER TABLE products ADD COLUMN concentration text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'purity') THEN
    ALTER TABLE products ADD COLUMN purity text DEFAULT 'Purity Guaranteed';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'vial_size') THEN
    ALTER TABLE products ADD COLUMN vial_size text DEFAULT '3ml';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'storage') THEN
    ALTER TABLE products ADD COLUMN storage text DEFAULT 'Store at -20°C';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'research_applications') THEN
    ALTER TABLE products ADD COLUMN research_applications text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'safety_info') THEN
    ALTER TABLE products ADD COLUMN safety_info text DEFAULT 'All products sold by Legacy Peptides are intended strictly for laboratory research and analytical purposes. These materials are not intended for human or animal use, and are not approved for any therapeutic, diagnostic, or medical application. Legacy Peptides does not provide instructions or guidance regarding preparation, reconstitution, administration, or dosage. No product sold is classified as a drug, dietary supplement, or medical device under federal law. All items are labeled "For Research Use Only – Not for Human or Animal Use" in accordance with 21 CFR 809.10(c). Any misuse or unauthorized application is strictly prohibited and may violate applicable laws.';
  END IF;
END $$;