import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/bn";
import { ChangeBadge } from "@/components/ProductCard";

function StatCard({ label, value, accent }) {
  return (
    <div className="bg-base-200 rounded-xl p-4">
      <p className="text-sm text-base-content/60">{label}</p>
      <p className={`text-xl font-bold mt-1 ${accent ?? ""}`}>{value} টাকা</p>
    </div>
  );
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  let products = [];
  try {
    products = await getProducts();
  } catch {}

  const product = products.find((p) => p.slug === decodeURIComponent(slug));
  if (!product) notFound();

  const markets = product.markets ?? [];
  const mins = markets.map((m) => Number(m.min));
  const maxs = markets.map((m) => Number(m.max));

  const minPrice = mins.length ? Math.min(...mins) : product.price;
  const maxPrice = maxs.length ? Math.max(...maxs) : product.price;
  const avgPrice = markets.length
    ? Math.round(
        markets.reduce((s, m) => s + (Number(m.min) + Number(m.max)) / 2, 0) /
          markets.length
      )
    : product.price;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <nav className="text-sm text-base-content/60 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link href={`/category/${product.category}`} className="hover:text-primary">
              {product.categoryName}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-base-content">{product.name}</span>
      </nav>

      <section className="bg-base-100 border border-base-300 rounded-2xl p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-base-200 flex items-center justify-center text-4xl">
              {product.emoji}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <p className="text-base-content/60 mt-1">
                {product.categoryName} • {product.unit} বাজার দরের সারসংক্ষেপ
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.categoryName && (
                  <span className="badge badge-success badge-outline">
                    {product.categoryIcon} {product.categoryName}
                  </span>
                )}
                <span className="badge badge-outline">{product.unit}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-base-content/60">আজকের দাম</p>
            <p className="text-3xl font-bold text-primary">
              {formatPrice(product.price)} টাকা
            </p>
            <div className="mt-1 flex justify-end">
              <ChangeBadge change={product.change} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 border border-base-300 rounded-2xl p-5 md:p-6">
        <h2 className="text-lg font-bold mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="সর্বনিম্ন দাম" value={formatPrice(minPrice)} accent="text-success" />
          <StatCard label="সর্বোচ্চ দাম" value={formatPrice(maxPrice)} accent="text-error" />
          <StatCard label="গড় দাম" value={formatPrice(avgPrice)} />
          <StatCard label="আজকের দাম" value={formatPrice(product.price)} accent="text-primary" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <StatCard label="গতকাল" value={formatPrice(product.yesterday)} />
          <StatCard label="গত সপ্তাহ" value={formatPrice(product.lastWeek)} />
          <StatCard label="গত মাস" value={formatPrice(product.lastMonth)} />
        </div>
      </section>

      <section className="bg-base-100 border border-base-300 rounded-2xl p-5 md:p-6">
        <h2 className="text-lg font-bold mb-4">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m, i) => (
                  <tr key={i}>
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{formatPrice(m.min)} টাকা</td>
                    <td className="text-right">{formatPrice(m.max)} টাকা</td>
                    <td className="text-right font-semibold">
                      {formatPrice(Math.round((Number(m.min) + Number(m.max)) / 2))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-base-content/60">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        )}
      </section>

      <div>
        <Link href="/" className="btn btn-outline btn-primary rounded-full">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}