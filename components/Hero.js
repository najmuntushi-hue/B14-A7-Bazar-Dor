import Image from "next/image";
import { toBn } from "@/lib/bn";

function Stat({ icon, label, value, note }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
      <p className="text-sm text-base-content/70 flex items-center gap-2">
        <span>{icon}</span>
        {label}
      </p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="text-xs text-primary mt-1">{note}</p>
    </div>
  );
}

export default function Hero({ productCount = 0, marketCount = 0, divisionCount = 0 }) {
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="max-w-6xl mx-auto px-4 pt-8">
      <div className="rounded-3xl border border-base-300 bg-base-200/60 p-6 md:p-10 grid lg:grid-cols-[1.5fr_1fr_0.8fr] gap-6 items-center">
        {/* left: text */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 text-primary text-sm font-medium px-4 py-2">
            📅 {date}
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold leading-tight">
            আজকের বাজারের দাম <span className="text-primary">এক নজরে</span>
          </h1>
          <p className="mt-4 text-base-content/70 max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার সর্বশেষ বাজারদর জানুন এক
            জায়গায়। দামের পরিবর্তন দেখুন সহজেই।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary rounded-md mt-6">
            সব পণ্য দেখুন →
          </a>
          <p className="mt-3 text-xs text-base-content/60">
            সহজেই জানুন নিত্যপণ্যের বাজারদর
          </p>
        </div>

        {/* middle: image */}
        <div className="rounded-3xl bg-base-100 p-6 flex items-center justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={420}
            height={340}
            className="w-full max-w-60 h-auto object-contain"
            priority
          />
        </div>

        {/* right: stats */}
        <div className="grid gap-4">
          <Stat icon="🛒" label="পণ্য" value={toBn(productCount)} note="টি নিত্যদিনের পণ্য" />
          <Stat icon="🏪" label="বাজার" value={toBn(marketCount)} note="টি বাজার অন্তর্ভুক্ত" />
          <Stat icon="🗂️" label="বিভাগ" value={toBn(divisionCount)} note="টি বিভাগের তথ্য" />
        </div>
      </div>
    </section>
  );
}