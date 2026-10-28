import { notFound } from "next/navigation";
import CategoryView from "@/components/CategoryView";
import { getCategories, getProducts } from "@/lib/api";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  let categories = [];
  try {
    categories = await getCategories();
  } catch {}

  const category = categories.find((c) => c.slug === decodeURIComponent(slug));
  if (!category) notFound();

  let products = [];
  try {
    products = await getProducts(category.slug);
  } catch {}

  return <CategoryView category={category} products={products} />;
}