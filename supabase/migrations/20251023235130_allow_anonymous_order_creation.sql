/*
  # Allow Anonymous Order Creation

  1. Changes
    - Add policy to allow anonymous users (anon role) to insert orders
    - This enables guest checkout functionality
    
  2. Security
    - Anonymous users can only INSERT orders (create new orders)
    - They cannot read, update, or delete orders
    - Only authenticated admin users can view and manage orders
*/

-- Drop the existing insert policy that requires authentication
DROP POLICY IF EXISTS "Admin users can insert orders" ON orders;

-- Create new policy allowing anonymous users to insert orders
CREATE POLICY "Allow anonymous order creation"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Recreate admin insert policy
CREATE POLICY "Admin users can insert orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);