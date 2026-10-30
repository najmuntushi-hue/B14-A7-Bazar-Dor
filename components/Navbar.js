"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [today, setToday] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/?q=${encodeURIComponent(term)}` : "/");
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("লগআউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  const catClass = (active) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
      active
        ? "bg-green-50 text-primary"
        : "text-base-content/70 hover:bg-base-200"
    }`;

  return (
    <header className="bg-base-100 sticky top-0 z-40">
      {/* Row 1: logo, search, auth */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-3 gap-x-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={44}
            height={44}
            className="w-10 h-10 object-contain"
            priority
          />
          <div className="leading-tight">
            <div className="text-xl sm:text-2xl font-bold">বাজার দর</div>
            <div className="text-xs text-base-content/60 min-h-4">{today}</div>
          </div>
        </Link>

        <form
          onSubmit={handleSearch}
          className="order-3 w-full md:order-none md:w-auto md:flex-1 md:max-w-xl flex rounded-xl border border-base-300 overflow-hidden"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="পণ্যের নাম লিখে খুঁজুন..."
            className="flex-1 min-w-0 px-4 py-2.5 text-sm outline-none bg-base-100"
          />
          <button type="submit" className="bg-primary text-primary-content px-5 text-sm font-semibold">
            খুঁজুন
          </button>
        </form>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-10 w-28 rounded-full" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-full border border-base-300 px-2 gap-2 h-auto py-1.5"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      alt="profile"
                      src={
                        session.user.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          session.user.name
                        )}&background=16a34a&color=fff`
                      }
                    />
                  </div>
                </div>
                <span className="hidden sm:inline text-sm max-w-28 truncate">
                  {session.user.name}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-50 mt-2 w-52 p-2 shadow border border-base-300"
              >
                <li className="menu-title truncate">{session.user.name}</li>
                <li><Link href="/my-profile">আমার প্রোফাইল</Link></li>
                <li><button onClick={handleSignOut}>সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline btn-primary rounded-full">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm sm:btn-md btn-primary rounded-full">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Row 2: category links */}
      <div className="border-y border-base-300">
        <nav className="max-w-6xl mx-auto px-4 py-2 flex gap-1 overflow-x-auto no-scrollbar lg:justify-center">
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            return (
              <Link key={c.slug} href={href} className={catClass(pathname === href)}>
                <span>{c.icon}</span>
                {c.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}