import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

function Section({ id, icon, iconClass, title, subtitle, note, products, cols }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 pt-12 scroll-mt-40">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        {icon && <span className={`text-lg ${iconClass}`}>{icon}</span>}
        {title}
      </h2>
      {subtitle && <p className="text-sm text-base-content/60 mt-1">{subtitle}</p>}
      {note && <p className="text-sm text-base-content/60">{note}</p>}

      {products.length ? (
        <div className={`mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 ${cols}`}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 text-center py-10">
          <p className="text-lg font-semibold">কোনো পণ্য পাওয়া যায়নি</p>
          <Link href="/" className="btn btn-primary btn-sm rounded-full mt-4">
            সব পণ্য দেখুন
          </Link>
        </div>
      )}
    </section>
  );
}

export default async function Home({ searchParams }) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q ?? "").trim();

  let products = [];
  let failed = false;
  try {
    products = await getProducts();
  } catch {
    failed = true;
  }

  if (failed) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-xl">ডেটা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>
      </div>
    );
  }

  const allMarkets = products.flatMap((p) => p.markets ?? []);
  const marketCount = new Set(allMarkets.map((m) => m.market)).size;
  const divisionCount = new Set(allMarkets.map((m) => m.division)).size;

  const risers = products.filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = products.filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  const shown = query ? products.filter((p) => p.name.includes(query)) : products;

  return (
    <>
      <Hero
        productCount={products.length}
        marketCount={marketCount}
        divisionCount={divisionCount}
      />

      {!query && (
        <>
          <Section icon="▲" iconClass="text-green-600" title="আজ দাম বেড়েছে" products={risers} cols="lg:grid-cols-3" />
          <Section icon="▼" iconClass="text-red-500" title="আজ দাম কমেছে" products={fallers} cols="lg:grid-cols-3" />
        </>
      )}

      <Section
        id="সব-পণ্য"
        title={query ? `“${query}” এর ফলাফল` : "সব পণ্য"}
        subtitle="দৈনন্দিন প্রয়োজনীয় সব পণ্যের বর্তমান বাজারদর"
        note={`মোট ${toBn(shown.length)}টি পণ্য দেখানো হচ্ছে`}
        products={shown}
        cols="lg:grid-cols-4"
      />
    </>
  );
}