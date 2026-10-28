"use client";

export const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="font-medium whitespace-nowrap">সাজান:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select select-bordered select-sm sm:select-md"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}