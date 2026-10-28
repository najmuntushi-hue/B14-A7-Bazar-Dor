"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // session load hole current naam input e boshao
  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/my-profile");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="skeleton h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center">তথ্য আপডেট করুন</h1>
        <p className="text-center text-base-content/60 mt-1 mb-6">আপনার নাম পরিবর্তন করুন</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">নাম</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="input input-bordered w-full mt-1"
            />
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
          </button>
          <Link href="/my-profile" className="btn btn-ghost w-full">বাতিল</Link>
        </form>
      </div>
    </div>
  );
}