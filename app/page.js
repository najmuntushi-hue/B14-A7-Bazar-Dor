import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

function Section({ title, subtitle, id, products, dot = "bg-primary" }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 pt-8 scroll-mt-40">
      <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        {title}
      </h2>
      {subtitle && <p className="text-sm text-base-content/60 mt-1">{subtitle}</p>}
      {products.length ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-base-content/60">কোনো পণ্য পাওয়া যায়নি।</p>
      )}
    </section>
  );
}

export default async function Home() {
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

  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <>
      <Hero />
      <Section title="আজ দাম বেড়েছে ▲" products={risers} dot="bg-green-500" />
      <Section title="আজ দাম কমেছে ▼" products={fallers} dot="bg-red-500" />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="সব পণ্যের আজকের দাম ও আগের দিনের তুলনায় পরিবর্তন"
        products={products}
      />
    </>
  );
}