import Link from "next/link";
import { formatPrice, toBn } from "@/lib/bn";

export function ChangeBadge({ change }) {
  const up = change > 0;
  const down = change < 0;
  const cls = up
    ? "bg-green-100 text-green-700"
    : down
    ? "bg-red-100 text-red-600"
    : "bg-gray-100 text-gray-500";
  const icon = up ? "▲" : down ? "▼" : "—";
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${cls}`}>
      {icon} {toBn(Math.abs(change).toFixed(1))}%
    </span>
  );
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-base-300 bg-base-200/60 p-5 transition hover:-translate-y-0.5 hover:bg-base-100 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 shrink-0 rounded-xl bg-base-100 border border-base-300 flex items-center justify-center text-3xl">
          {product.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug">{product.name}</h3>
          <p className="text-sm text-base-content/60">{product.unit}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-xl font-bold">{formatPrice(product.price)} টাকা</p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}