"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";

export default function CategoryView({ category, products }) {
  const [sort, setSort] = useState("default");

  // price number hishebe normalize kora, tai numeric sort thik hobe
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-2xl font-bold">{category.name}</h1>
        </div>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {sorted.length ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-3">🛒</div>
          <p className="text-xl font-semibold mb-1">কোনো পণ্য পাওয়া যায়নি</p>
          <p className="text-base-content/60 mb-5">এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।</p>
          <Link href="/" className="btn btn-primary rounded-full">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </div>
  );
}