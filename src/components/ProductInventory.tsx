import React, { useState, useEffect } from 'react';
import { Package, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface ProductInventoryRecord {
  id: string;
  product_name: string;
  product_id: string;
  is_sold_out: boolean;
}

const PRODUCTS: Product[] = [
  { id: '1', name: '5-AMINO-1MQ', category: 'Metabolic', price: '$49.95', image: '/5-AMINO-1MQ.png' },
  { id: '2', name: 'AOD-9604', category: 'Research', price: '$59.95', image: '/AOD-9604.png' },
  { id: '3', name: 'BPC-157 / TB-500', category: 'Recovery', price: '$89.95', image: '/BPC-157 -TB500.png' },
  { id: '4', name: 'BPC-157', category: 'Recovery', price: '$49.95', image: '/BPC-157 10MG.png' },
  { id: '5', name: 'CAGRILINTIDE', category: 'GLP', price: '$59.95', image: '/Cagrilintide 5MG.png' },
  { id: '6', name: 'CJC-1295 / IPAMORELIN', category: 'Growth', price: '$79.95', image: '/CJC-1295IPAMORELINE 5MG.png' },
  { id: '7', name: 'DSIP', category: 'Sleep', price: '$44.95', image: '/DSIP 5MG.png' },
  { id: '8', name: 'EPITALON', category: 'Longevity', price: '$49.95', image: '/EPITALON 10MG.png' },
  { id: '9', name: 'GHK-CU', category: 'Anti-Aging', price: '$49.95', image: '/GHK-CU.png' },
  { id: '10', name: 'GLOW', category: 'Skin', price: '$89.95', image: '/GLOW.png' },
  { id: '11', name: 'GLP-1 (S)', category: 'GLP', price: '$59.95', image: '/GLP-1 (S).png' },
  { id: '12', name: 'GLP-2 (T)', category: 'GLP', price: '$59.95', image: '/GLP-2 (T).png' },
  { id: '13', name: 'GLP-3 (RETA)', category: 'GLP', price: '$59.95', image: '/GLP-3 (RETA).png' },
  { id: '14', name: 'IPAMORELIN', category: 'Growth', price: '$49.95', image: '/IPAMORELIN.png' },
  { id: '15', name: 'KISSPEPTIN', category: 'Hormone', price: '$64.95', image: '/KISSPEPTIN 10MG.png' },
  { id: '16', name: 'MELANOTAN 1', category: 'Tanning', price: '$49.95', image: '/MELANOTAN 1 10MG.png' },
  { id: '17', name: 'MELANOTAN 2', category: 'Tanning', price: '$49.95', image: '/MELANOTAN 2 10MG.png' },
  { id: '18', name: 'MOTS-C', category: 'Mitochondrial', price: '$79.95', image: '/MOTS-C.png' },
  { id: '19', name: 'NAD+', category: 'Cellular', price: '$89.95', image: '/NAD+.png' },
  { id: '20', name: 'PT-141', category: 'Libido', price: '$54.95', image: '/PT-141 10MG.png' },
  { id: '21', name: 'SELANK', category: 'Cognitive', price: '$49.95', image: '/SELANK 5MG.png' },
  { id: '22', name: 'SEMAX', category: 'Cognitive', price: '$49.95', image: '/SEMAX 5MG.png' },
  { id: '23', name: 'SERMORELIN', category: 'Growth', price: '$54.95', image: '/SERMORELIN 10MG.png' },
  { id: '24', name: 'SLU-PP-332', category: 'Metabolic', price: '$89.95', image: '/SLU-PP-332 5MG.png' },
  { id: '25', name: 'SS-31', category: 'Mitochondrial', price: '$79.95', image: '/SS-31 10MG.png' },
  { id: '26', name: 'TB-500', category: 'Recovery', price: '$59.95', image: '/TB-500 10MG.png' },
  { id: '27', name: 'TESAMORELIN', category: 'Growth', price: '$69.95', image: '/TESAMORELIN.png' },
  { id: '28', name: 'TESAMORELIN / IPAMORELIN', category: 'Growth', price: '$79.95', image: '/TESAMORELIN  IPAMORELIN 5MG.png' },
  { id: '29', name: 'THYMOSIN ALPHA-1', category: 'Immune', price: '$64.95', image: '/THYMOSIN ALPHA-1.png' },
  { id: '30', name: 'BACTERIOSTATIC WATER', category: 'Supplies', price: '$9.95', image: '/BACTERIOSTATIC WATER 10ML.png' },
];

export const ProductInventory: React.FC = () => {
  const [inventory, setInventory] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const { data, error } = await supabase
      .from('product_inventory')
      .select('*');

    if (error) {
      console.error('Error loading inventory:', error);
      setLoading(false);
      return;
    }

    const inventoryMap: Record<string, boolean> = {};
    data?.forEach((item: ProductInventoryRecord) => {
      inventoryMap[item.product_id] = item.is_sold_out;
    });

    setInventory(inventoryMap);
    setLoading(false);
  };

  const toggleSoldOut = async (product: Product) => {
    const currentStatus = inventory[product.id] || false;
    const newStatus = !currentStatus;

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

    setInventory({ ...inventory, [product.id]: newStatus });
  };

  const toggleAllSoldOut = async () => {
    const allSoldOut = PRODUCTS.every(p => inventory[p.id]);
    const newStatus = !allSoldOut;

    for (const product of PRODUCTS) {
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
    PRODUCTS.forEach(p => {
      newInventory[p.id] = newStatus;
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
  const allSoldOut = PRODUCTS.every(p => inventory[p.id]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
          <p className="text-sm text-gray-600 mt-1">
            {soldOutCount} of {PRODUCTS.length} products marked as sold out
          </p>
        </div>
        <button
          onClick={toggleAllSoldOut}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            allSoldOut
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {allSoldOut ? 'Mark All In Stock' : 'Mark All Sold Out'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {PRODUCTS.map((product) => {
          const isSoldOut = inventory[product.id] || false;
          return (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all cursor-pointer ${
                isSoldOut ? 'border-2 border-red-500' : 'border border-gray-200'
              }`}
              onClick={() => toggleSoldOut(product)}
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
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{product.category}</span>
                  <span className="font-semibold text-gray-900">{product.price}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className={`flex items-center gap-1 text-xs font-semibold ${
                    isSoldOut ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {isSoldOut ? (
                      <>
                        <AlertCircle size={14} />
                        <span>Out of Stock</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} />
                        <span>In Stock</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">Click to toggle</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
