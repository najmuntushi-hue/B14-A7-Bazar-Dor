"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-40 w-full rounded-2xl" />
      </div>
    );
  }

  const user = session?.user;
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="mb-4">প্রোফাইল দেখতে সাইন ইন করুন।</p>
        <Link href="/signin" className="btn btn-primary rounded-full">সাইন ইন</Link>
      </div>
    );
  }

  const avatar =
    user.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=16a34a&color=fff&size=128`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-1">আমার প্রোফাইল</h1>
      <p className="text-base-content/60 mb-6">আপনার অ্যাকাউন্টের তথ্য</p>

      <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-base-content/60">{user.email}</p>
            </div>
          </div>
          <Link href="/my-profile/update" className="btn btn-primary btn-outline rounded-full">
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}