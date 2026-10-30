import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/api";

export const metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
  icons: { icon: "/logo-icon.png" },
};

export default async function RootLayout({ children }) {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {}

  return (
    <html lang="bn" data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-base-100">
        <Navbar categories={categories} />
        <PriceTicker />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}