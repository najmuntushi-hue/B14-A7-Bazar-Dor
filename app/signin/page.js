"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirect = params.get("redirect");
  const target = redirect && redirect.startsWith("/") ? redirect : "/";

  useEffect(() => {
    if (params.get("protected")) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "লগইন ব্যর্থ হয়েছে";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("লগইন সফল হয়েছে");
    router.push(target);
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center">সাইন ইন করুন</h1>
        <p className="text-center text-base-content/60 mt-1 mb-6">
          আপনার অ্যাকাউন্টে প্রবেশ করুন
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" placeholder="you@example.com" className="input input-bordered w-full mt-1" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" placeholder="••••••••" className="input input-bordered w-full mt-1" />
          </label>

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
          </button>
        </form>

        <div className="divider text-sm text-base-content/50">অথবা</div>
        <SocialButtons callbackURL={target} />

        <p className="text-center text-sm mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="skeleton h-96 w-full rounded-2xl" />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}