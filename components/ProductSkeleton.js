export function CardSkeleton() {
  return (
    <div className="bg-base-100 rounded-xl border border-base-300 p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton w-12 h-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="mt-4 flex justify-between items-end">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-5 w-24" />
        </div>
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}