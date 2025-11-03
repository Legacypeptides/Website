import React from 'react';

type Variant = { variant_id: string; strength: string; price: number };

export type ProductRow = {
  product_id_root: string;
  name: string | null;
  description: string | null;
  image_url: string | null;
  variants: Variant[];
};

function parseMg(str?: string | null): number {
  if (!str) return Number.MAX_SAFE_INTEGER;
  const m = String(str).match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : Number.MAX_SAFE_INTEGER;
}

export default function ProductCard({ product, onSelect }: {
  product: ProductRow;
  onSelect?: (p: ProductRow) => void;
}) {
  const { name, description, image_url, variants } = product;

  const sorted = [...(variants || [])].sort(
    (a, b) => parseMg(a.strength) - parseMg(b.strength)
  );

  const prices = sorted.map(v => v.price).filter(p => typeof p === 'number');
  const minPrice = prices.length ? Math.min(...prices) : undefined;

  const imgSrc = image_url && image_url.trim() !== '' ? image_url : '/placeholder.svg';

  return (
    <div
      className="group rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow
                 flex flex-col min-h-[420px]"
      role="button"
      onClick={() => onSelect?.(product)}
    >
      {/* Image box */}
      <div className="h-48 w-full bg-white/40 rounded-md flex items-center justify-center overflow-hidden">
        <img
          src={imgSrc}
          alt={name ?? 'Product image'}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <h3 className="mt-3 text-lg font-semibold clamp-1">{name}</h3>

      {/* Description */}
      {description && (
        <p className="mt-1 text-sm text-zinc-600 clamp-2">{description}</p>
      )}

      {/* Strength chips */}
      {sorted.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {sorted.map(v => (
            <span
              key={v.variant_id}
              className="px-2 py-0.5 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200"
              title={`${v.strength} - $${v.price.toFixed(2)}`}
            >
              {v.strength}
            </span>
          ))}
        </div>
      )}

      {/* Price row sticks to bottom */}
      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-700">
          {minPrice !== undefined
            ? (prices.length > 1 ? `From $${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)}`)
            : 'Price unavailable'}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide bg-zinc-900 text-white px-2 py-1 rounded">
          USA Company
        </span>
      </div>
    </div>
  );
}
