export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <div className="bg-base-100 rounded-2xl border border-base-300 p-6 md:p-10 flex flex-col-reverse md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <span className="badge badge-success badge-outline mb-3">
            প্রতিদিনের বাজার আপডেট
          </span>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-base-content/70">
            চাল, ডাল, তেল, মাছ, মাংস ও সবজিসহ প্রয়োজনীয় পণ্যের আজকের দাম এবং
            আগের দিনের তুলনায় দাম বাড়া-কমার হিসাব দেখুন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary rounded-full mt-5">
            সব পণ্যের দাম দেখুন
          </a>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-44 h-44 md:w-64 md:h-64 rounded-full bg-base-200 flex items-center justify-center text-8xl md:text-9xl">
            🧺
          </div>
        </div>
      </div>
    </section>
  );
}