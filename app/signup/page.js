"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const password = form.get("password");

    let msg = "";
    if (!name) msg = "নাম দিন";
    else if (!email) msg = "ইমেইল দিন";
    else if (password.length < 8) msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    if (msg) {
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      const m = error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
      setError(m);
      toast.error(m);
      return;
    }
    toast.success("রেজিস্ট্রেশন সফল হয়েছে, এখন সাইন ইন করুন");
    await authClient.signOut();
    router.push("/signin");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-center text-base-content/60 mt-1 mb-6">নতুন অ্যাকাউন্ট খুলুন</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">নাম</span>
            <input name="name" type="text" placeholder="আপনার নাম" className="input input-bordered w-full mt-1" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" placeholder="you@example.com" className="input input-bordered w-full mt-1" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered w-full mt-1" />
          </label>

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার"}
          </button>
        </form>

        <div className="divider text-sm text-base-content/50">অথবা</div>
        <SocialButtons callbackURL="/" />

        <p className="text-center text-sm mt-6">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-primary font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}