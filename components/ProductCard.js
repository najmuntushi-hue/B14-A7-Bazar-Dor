import Link from "next/link";
import { formatPrice, toBn } from "@/lib/bn";

export function ChangeBadge({ change }) {
  const up = change > 0;
  const down = change < 0;
  const cls = up
    ? "bg-green-50 text-green-700"
    : down
    ? "bg-red-50 text-red-600"
    : "bg-gray-100 text-gray-500";
  const icon = up ? "▲" : down ? "▼" : "—";
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${cls}`}>
      {icon} {toBn(Math.abs(change).toFixed(1))}%
    </span>
  );
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-base-100 rounded-lg border border-base-300 p-3 hover:shadow-md hover:border-primary/40 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 rounded-full bg-base-200 flex items-center justify-center text-2xl">
          {product.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">{product.name}</h3>
          <p className="text-xs text-base-content/60">{product.unit}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-base-300 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-base-content/60">আজকের দাম</p>
          <p className="text-base font-bold">{formatPrice(product.price)} টাকা</p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}