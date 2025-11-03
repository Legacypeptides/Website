import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard, { ProductRow } from './ProductCard';

type ProductsSectionProps = {
  onProductSelect?: (p: ProductRow) => void;
};

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onProductSelect }) => {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products_grouped')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error loading products_grouped:', error);
      setProducts([]);
      setLoading(false);
      return;
    }

    const cleaned: ProductRow[] = (data || []).map((row: any) => ({
      product_id_root: row.product_id_root,
      name: row.name ?? '',
      description: row.description ?? '',
      image_url: row.image_url ?? '',
      variants: Array.isArray(row.variants) ? row.variants : []
    }));

    setProducts(cleaned);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="py-16 text-center text-zinc-600">Loading products…</div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-16 text-center text-zinc-600">
        No products available.
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.product_id_root} product={p} onSelect={onProductSelect} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
