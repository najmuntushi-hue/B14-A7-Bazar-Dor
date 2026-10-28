"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL = "/" }) {
  const social = async (provider) => {
    try {
      await authClient.signIn.social({ provider, callbackURL });
    } catch {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button type="button" onClick={() => social("google")} className="btn btn-outline">
        <span className="font-bold">G</span> Google
      </button>
      <button type="button" onClick={() => social("github")} className="btn btn-outline">
        <span>🐙</span> GitHub
      </button>
    </div>
  );
}