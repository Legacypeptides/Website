import React, { useState, useEffect } from 'react';
import { Package, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Toast } from './Toast';

interface Product {
  id: string;
  product_id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductInventoryRecord {
  id: string;
  product_name: string;
  product_id: string;
  is_sold_out: boolean;
}

export const ProductInventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [togglingProduct, setTogglingProduct] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  useEffect(() => {
    loadProducts();
    loadInventory();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, product_id, name, category, price, image')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error loading products:', error);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  };

  const loadInventory = async () => {
    const { data, error } = await supabase
      .from('product_inventory')
      .select('*');

    if (error) {
      console.error('Error loading inventory:', error);
      return;
    }

    const inventoryMap: Record<string, boolean> = {};
    data?.forEach((item: ProductInventoryRecord) => {
      inventoryMap[item.product_id] = item.is_sold_out;
    });

    setInventory(inventoryMap);
  };

  const toggleSoldOut = async (product: Product) => {
    setTogglingProduct(product.product_id);
    const currentStatus = inventory[product.product_id] || false;
    const newStatus = !currentStatus;

    try {
      const { data: existing } = await supabase
        .from('product_inventory')
        .select('*')
        .eq('product_id', product.product_id)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('product_inventory')
          .update({ is_sold_out: newStatus, updated_at: new Date().toISOString() })
          .eq('product_id', product.product_id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('product_inventory')
          .insert([{
            product_name: product.name,
            product_id: product.product_id,
            is_sold_out: newStatus
          }]);

        if (error) throw error;
      }

      setInventory({ ...inventory, [product.product_id]: newStatus });
      setToast({
        message: `${product.name} marked as ${newStatus ? 'out of stock' : 'in stock'}`,
        type: 'success'
      });
    } catch (error) {
      console.error('Error updating stock status:', error);
      setToast({
        message: 'Failed to update stock status. Please try again.',
        type: 'error'
      });
    } finally {
      setTogglingProduct(null);
    }
  };

  const toggleAllSoldOut = async () => {
    const allSoldOut = products.every((p: Product) => inventory[p.product_id]);
    const newStatus = !allSoldOut;

    for (const product of products) {
      const { data: existing } = await supabase
        .from('product_inventory')
        .select('*')
        .eq('product_id', product.id)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('product_inventory')
          .update({ is_sold_out: newStatus, updated_at: new Date().toISOString() })
          .eq('product_id', product.id);
      } else {
        await supabase
          .from('product_inventory')
          .insert([{
            product_name: product.name,
            product_id: product.id,
            is_sold_out: newStatus
          }]);
      }
    }

    const newInventory: Record<string, boolean> = {};
    products.forEach((p: Product) => {
      newInventory[p.product_id] = newStatus;
    });
    setInventory(newInventory);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading inventory...</div>
      </div>
    );
  }

  const soldOutCount = Object.values(inventory).filter(Boolean).length;
  const allSoldOut = products.every((p: Product) => inventory[p.product_id]);

  return (
    <div className="h-full flex flex-col p-6">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
          <p className="text-sm text-gray-600 mt-1">
            {soldOutCount} of {products.length} products marked as sold out
          </p>
        </div>
        <button
          onClick={toggleAllSoldOut}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${allSoldOut
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-red-600 text-white hover:bg-red-700'
            }`}
        >
          {allSoldOut ? 'Mark All In Stock' : 'Mark All Sold Out'}
        </button>
      </div>

      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
          {products.map((product: Product) => {
            const isSoldOut = inventory[product.product_id] || false;
            return (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${isSoldOut ? 'border-2 border-red-500' : 'border border-gray-200'
                  }`}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  {isSoldOut && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-lg transform -rotate-12">
                        SOLD OUT
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-500">{product.category}</span>
                    <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className={`flex items-center gap-2 text-sm font-semibold ${isSoldOut ? 'text-red-600' : 'text-green-600'
                      }`}>
                      {isSoldOut ? (
                        <>
                          <AlertCircle size={16} />
                          <span>Out of Stock</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          <span>In Stock</span>
                        </>
                      )}
                    </div>

                    {/* Toggle Button */}
                    <button
                      onClick={() => toggleSoldOut(product)}
                      disabled={togglingProduct === product.product_id}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${isSoldOut
                          ? 'bg-red-600 focus:ring-red-500'
                          : 'bg-green-600 focus:ring-green-500'
                        }`}
                      title={isSoldOut ? 'Mark as in stock' : 'Mark as sold out'}
                    >
                      {togglingProduct === product.product_id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      ) : (
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSoldOut ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
