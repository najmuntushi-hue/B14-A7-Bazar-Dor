# 🛒 বাজার দর | BazarDor

প্রয়োজনীয় পণ্যের দাম এক নজরে। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার সর্বশেষ বাজারদর, দামের ওঠানামা এবং বিভিন্ন বাজারের তুলনামূলক দাম দেখার একটি আধুনিক ওয়েব অ্যাপ।

🔗 **Live Link:** https://b14-a7-bazar-dor-mu-one.vercel.app

## 📌 Short Description

BazarDor একটি Next.js ভিত্তিক বাজারদর ট্র্যাকার। ব্যবহারকারী আজকের দাম, আগের দিনের তুলনায় দাম বাড়া-কমা এবং ঢাকা, চট্টগ্রাম, রাজশাহী, ময়মনসিংহ, খুলনা ও সিলেট বিভাগের বিভিন্ন বাজারের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম দেখতে পারেন। পণ্যের বিস্তারিত পেজ দেখতে লগইন করতে হয়।

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js (App Router) | UI, routing ও server rendering |
| JavaScript (React) | Component ভিত্তিক UI |
| Tailwind CSS | Styling ও responsive design |
| DaisyUI | UI component library |
| Better Auth | Email/Password, Google ও GitHub authentication |
| MongoDB | User ও session ডেটা সংরক্ষণ |
| react-hot-toast | Toast notification |
| Vercel | Deployment |

## ✨ Key Features

1. **Live Price Ticker:** নেভবারের নিচে অসীম স্ক্রলিং মার্কি, যেখানে ইমোজি, পণ্যের নাম, বাংলা সংখ্যায় দাম ও ▲/▼ পরিবর্তনের হার দেখা যায়।
2. **দাম বাড়া-কমার সেকশন:** হোম পেজে সবচেয়ে বেশি দাম বাড়া ও কমা শীর্ষ ৬টি পণ্য এবং সব পণ্যের রেসপন্সিভ কার্ড গ্রিড।
3. **Category Page ও Sorting:** ক্যাটাগরি অনুযায়ী পণ্য, স্কেলেটন লোডিং, এবং বাংলা সংখ্যা সঠিকভাবে হ্যান্ডেল করে দাম অনুযায়ী সাজানোর (কম থেকে বেশি / বেশি থেকে কম) সুবিধা।
4. **Protected Product Details:** লগইন ছাড়া ঢোকা যায় না। বিস্তারিত পেজে সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বিভাগভিত্তিক বাজারের দামের টেবিল।
5. **Authentication ও Profile:** Better Auth দিয়ে Email/Password, Google ও GitHub লগইন, toast নোটিফিকেশন, এবং প্রোফাইল পেজ থেকে নাম আপডেট করার সুবিধা।

## 🚀 Getting Started

1. রিপোজিটরি ক্লোন করুন এবং `npm install` চালান
2. `.env.local` ফাইলে `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_API_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` দিন
3. `npm run dev` চালান এবং `http://localhost:3000` খুলুন

## 📡 API

`https://openapi.programming-hero.com/api/bazardor`

- `/products`, `/products?category=chal`, `/categories`
