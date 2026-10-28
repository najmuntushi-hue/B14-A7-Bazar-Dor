export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="skeleton h-4 w-48" />
      <div className="skeleton h-32 w-full rounded-2xl" />
      <div className="skeleton h-48 w-full rounded-2xl" />
      <div className="skeleton h-72 w-full rounded-2xl" />
    </div>
  );
}