import { bnToNum } from "./bn";

const BASE = process.env.NEXT_PUBLIC_API_URL;

/* ---------- helpers ---------- */
const UNIT_BN = {
  kg: "কেজি", kilogram: "কেজি", litre: "লিটার", liter: "লিটার", l: "লিটার",
  dozen: "ডজন", piece: "পিস", pcs: "পিস", pc: "পিস", hali: "হালি",
};

// number/string/array/object jai hok, theke ekta number ber kore
function numFrom(v, depth = 0) {
  if (v == null || depth > 3) return NaN;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const cleaned = v.replace(/[^\d০-৯.,-]/g, "");
    if (!cleaned) return NaN;
    const n = bnToNum(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  if (Array.isArray(v)) {
    const ns = v.map((x) => numFrom(x, depth + 1)).filter(Number.isFinite);
    return ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : NaN;
  }
  if (typeof v === "object") {
    for (const k of ["avg", "average", "today", "current", "price", "value", "min"]) {
      if (v[k] != null) {
        const n = numFrom(v[k], depth + 1);
        if (Number.isFinite(n)) return n;
      }
    }
    const any = Object.keys(v).find((k) => /price|avg|average/i.test(k));
    if (any) return numFrom(v[any], depth + 1);
  }
  return NaN;
}

const text = (v) => {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") return v.bn ?? v.bangla ?? v.en ?? "";
  return "";
};

const nameOf = (p) => {
  for (const k of ["name", "name_bn", "nameBn", "bn_name", "title", "product_name", "productName", "label"]) {
    const t = text(p[k]);
    if (t) return t;
  }
  const k = Object.keys(p).find((k) => /name|title/i.test(k) && text(p[k]));
  return k ? text(p[k]) : "";
};

const priceOf = (p) => {
  const known = ["price", "today_price", "todayPrice", "current_price", "currentPrice",
    "avgPrice", "avg_price", "average_price", "averagePrice", "rate"];
  for (const k of known) {
    if (p[k] != null) {
      const n = numFrom(p[k]);
      if (Number.isFinite(n)) return n;
    }
  }
  const k = Object.keys(p).find((k) => /price|rate|taka|দাম/i.test(k) && Number.isFinite(numFrom(p[k])));
  return k ? numFrom(p[k]) : 0;
};

const changeOf = (p) => {
  const guess = Object.keys(p).filter((k) => /change|percent|diff|delta/i.test(k));
  const keys = ["change", "change_percent", "changePercent", "percent", "priceChange", "price_change", ...guess];
  for (const k of keys) {
    if (p[k] == null) continue;
    let n = numFrom(p[k]);
    if (!Number.isFinite(n)) continue;
    const raw = String(p[k]);
    const dir = String(p.direction ?? p.trend ?? p.status ?? p.change_type ?? "").toLowerCase();
    if ((raw.includes("▼") || dir.includes("down") || dir.includes("fall")) && n > 0) n = -n;
    return n;
  }
  return 0;
};

const unitOf = (p) => {
  const raw = text(p.unit_bn ?? p.unitBn ?? p.unit ?? "");
  if (!raw) return "";
  if (raw.startsWith("প্রতি")) return raw;
  const bn = UNIT_BN[raw.toLowerCase().trim()] ?? raw;
  return `প্রতি ${bn}`;
};

const toArray = (data) => {
  if (Array.isArray(data)) return data;
  for (const k of ["products", "categories", "data", "items", "result"]) {
    if (Array.isArray(data?.[k])) return data[k];
  }
  return [];
};

/* ---------- normalizers ---------- */
export const normalizeProduct = (p) => ({
  id: p.id ?? p._id ?? p.slug,
  slug: String(p.slug ?? p.id ?? p._id),
  name: nameOf(p),
  emoji: p.emoji ?? p.icon ?? "🛒",
  unit: unitOf(p),
  category: text(p.category ?? p.category_slug ?? p.categoryId ?? ""),
  price: priceOf(p),
  change: changeOf(p),
  raw: p, // details page e bazar-wise data lagbe
});

export const normalizeCategory = (c) => ({
  slug: String(c.slug ?? c.id ?? c._id),
  name: nameOf(c),
  icon: c.icon ?? c.emoji ?? "",
});

/* ---------- fetchers ---------- */
async function get(path) {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export async function getProducts(category) {
  const data = await get(category ? `/products?category=${category}` : "/products");
  const list = toArray(data);
  if (process.env.NODE_ENV === "development" && list[0]) {
    console.log("RAW PRODUCT:", JSON.stringify(list[0]));
  }
  return list.map(normalizeProduct);
}

export async function getCategories() {
  const data = await get("/categories");
  const list = toArray(data);
  if (process.env.NODE_ENV === "development" && list[0]) {
    console.log("RAW CATEGORY:", JSON.stringify(list[0]));
  }
  return list.map(normalizeCategory);
}