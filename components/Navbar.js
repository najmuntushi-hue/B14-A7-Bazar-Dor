"use client";
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

  // hydration error avoid korar jonno useEffect e date set kora hoyeche
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

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("লগআউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  const linkClass = (active) =>
    `btn btn-xs sm:btn-sm rounded-full whitespace-nowrap font-medium ${
      active
        ? "btn-primary"
        : "btn-ghost text-base-content/70 hover:bg-base-200"
    }`;

  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Logo + Bangla date */}
        <Link href="/" className="leading-tight">
          <div className="text-xl sm:text-2xl font-bold text-primary">
            🛒 বাজার দর
          </div>
          <div className="text-xs text-base-content/60 min-h-4">{today}</div>
        </Link>

        {/* Category links (desktop e majhkhane, mobile e niche scroll) */}
        <nav className="order-3 w-full lg:order-none lg:w-auto lg:flex-1 lg:justify-center flex gap-1.5 overflow-x-auto no-scrollbar">
          <Link href="/" className={linkClass(pathname === "/")}>
            🏠 হোম
          </Link>
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={href}
                className={linkClass(pathname === href)}
              >
                {c.icon} {c.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth buttons / profile */}
        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24 rounded-full" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-full px-2 gap-2"
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
                <li>
                  <Link href="/my-profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-sm sm:btn-md btn-outline btn-primary rounded-full"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm sm:btn-md btn-primary rounded-full"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}