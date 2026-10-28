const BASE = process.env.NEXT_PUBLIC_API_URL;

const UNIT_BN = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  hali: "হালি",
};

const toArray = (data) => {
  if (Array.isArray(data)) return data;
  for (const k of ["products", "categories", "data", "items", "result"]) {
    if (Array.isArray(data?.[k])) return data[k];
  }
  return [];
};

export const normalizeProduct = (p) => {
  // change: { dir: "up" | "down" | "flat", pct: 2.1 }
  let change = 0;
  if (typeof p.change === "number") {
    change = p.change;
  } else if (p.change) {
    const pct = Math.abs(Number(p.change.pct ?? 0));
    change = p.change.dir === "down" ? -pct : p.change.dir === "up" ? pct : 0;
  }

  return {
    id: p.id,
    slug: String(p.slug ?? p.id),
    name: p.nameBn ?? p.name ?? "",
    emoji: p.image ?? p.categoryIcon ?? "🛒",
    unit: `প্রতি ${UNIT_BN[p.unit] ?? p.unit ?? ""}`,
    category: p.category ?? "",
    categoryName: p.categoryNameBn ?? "",
    categoryIcon: p.categoryIcon ?? "",
    price: Number(p.today ?? 0),
    yesterday: Number(p.yesterday ?? 0),
    lastWeek: Number(p.lastWeek ?? 0),
    lastMonth: Number(p.lastMonth ?? 0),
    change,
    markets: p.markets ?? [],
  };
};

export const normalizeCategory = (c) => ({
  slug: String(c.slug ?? c.id),
  name: c.nameBn ?? c.name ?? "",
  icon: c.icon ?? "",
});

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export async function getProducts(category) {
  const data = await get(category ? `/products?category=${category}` : "/products");
  return toArray(data).map(normalizeProduct);
}

export async function getProductBySlug(slug) {
  const list = await getProducts();
  return list.find((p) => p.slug === slug) ?? null;
}

export async function getCategories() {
  const data = await get("/categories");
  return toArray(data).map(normalizeCategory);
}