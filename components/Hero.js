function Basket() {
  return (
    <svg viewBox="0 0 240 200" className="w-full h-full" role="img" aria-label="বাজারের ঝুড়ি">
      {/* pata */}
      <ellipse cx="78" cy="62" rx="16" ry="8" fill="#22c55e" transform="rotate(-30 78 62)" />
      <ellipse cx="168" cy="58" rx="16" ry="8" fill="#16a34a" transform="rotate(25 168 58)" />
      {/* phol ar sobji */}
      <circle cx="92" cy="92" r="30" fill="#ef4444" />
      <circle cx="140" cy="84" r="28" fill="#f97316" />
      <circle cx="178" cy="98" r="24" fill="#dc2626" />
      <ellipse cx="124" cy="70" rx="14" ry="22" fill="#22c55e" />
      <circle cx="84" cy="84" r="6" fill="#fff" opacity=".35" />
      <circle cx="132" cy="76" r="6" fill="#fff" opacity=".35" />
      {/* jhuri */}
      <path d="M30 108 H210 L192 184 Q190 192 182 192 H58 Q50 192 48 184 Z" fill="#c2763a" />
      <path d="M30 108 H210" stroke="#a45f2c" strokeWidth="8" strokeLinecap="round" />
      <g stroke="#a45f2c" strokeWidth="3" opacity=".7">
        <path d="M44 130 H196" />
        <path d="M50 152 H190" />
        <path d="M54 172 H186" />
        <path d="M80 108 L74 190" />
        <path d="M110 108 L108 192" />
        <path d="M140 108 L142 192" />
        <path d="M170 108 L176 190" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <div className="bg-base-100 rounded-2xl border border-base-300 px-6 py-8 md:px-10 md:py-10 flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 text-primary text-xs font-semibold px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            আজকের বাজার আপডেট
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-sm md:text-base text-base-content/70 max-w-xl mx-auto md:mx-0">
            চাল, ডাল, তেল, মাছ, মাংস ও সবজিসহ প্রয়োজনীয় পণ্যের আজকের দাম এবং আগের
            দিনের তুলনায় দাম বাড়া-কমার হিসাব দেখুন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn btn-sm md:btn-md btn-outline btn-primary bg-base-100 rounded-md mt-5"
          >
            সব পণ্যের দাম দেখুন
          </a>
        </div>

        <div className="w-48 h-40 md:w-72 md:h-60 shrink-0">
          <Basket />
        </div>
      </div>
    </section>
  );
}