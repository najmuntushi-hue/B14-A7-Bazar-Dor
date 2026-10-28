import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-4">🛒</div>
      <h1 className="text-5xl font-bold mb-2">৪০৪</h1>
      <p className="text-xl font-semibold mb-2">দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি</p>
      <p className="text-base-content/60 mb-6">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা লিংকটি ভুল।
      </p>
      <Link href="/" className="btn btn-primary rounded-full">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}