import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="skeleton h-8 w-56" />
      <ProductSkeleton count={6} />
    </div>
  );
}