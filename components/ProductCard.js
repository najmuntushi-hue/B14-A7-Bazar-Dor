import Link from "next/link";
import { formatPrice, toBn } from "@/lib/bn";

export function ChangeBadge({ change }) {
  const up = change > 0;
  const down = change < 0;
  const cls = up
    ? "bg-green-100 text-green-700"
    : down
    ? "bg-red-100 text-red-700"
    : "bg-gray-100 text-gray-600";
  const icon = up ? "▲" : down ? "▼" : "—";
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${cls}`}>
      {icon} {toBn(Math.abs(change).toFixed(1))}%
    </span>
  );
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-base-100 rounded-xl border border-base-300 p-4 hover:shadow-md hover:-translate-y-0.5 transition"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 shrink-0 rounded-lg bg-base-200 flex items-center justify-center text-3xl">
          {product.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold truncate">{product.name}</h3>
          <p className="text-sm text-base-content/60">{product.unit}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold">{formatPrice(product.price)} টাকা</p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}