import { getProducts } from "@/lib/api";
import { formatPrice, toBn } from "@/lib/bn";

export default async function PriceTicker() {
  let products = [];
  try {
    products = await getProducts();
  } catch {}
  if (!products.length) return null;

  const items = products.map((p) => {
    const up = p.change > 0;
    const down = p.change < 0;
    return (
      <span
        key={p.id}
        className="flex items-center gap-2 px-6 py-3 whitespace-nowrap text-sm border-r border-base-300"
      >
        <span className="text-lg">{p.emoji}</span>
        <span className="font-semibold">{p.name}</span>
        <span className="text-base-content/60">
          {formatPrice(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
        </span>
        <span
          className={`font-semibold ${
            up ? "text-success" : down ? "text-error" : "text-base-content/50"
          }`}
        >
          {up ? "▲" : down ? "▼" : "—"} {toBn(Math.abs(p.change).toFixed(1))}%
        </span>
      </span>
    );
  });

  return (
    <div className="bg-base-100 border-b border-base-300 overflow-hidden">
      <div className="ticker-track flex w-max">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden="true">{items}</div>
      </div>
    </div>
  );
}