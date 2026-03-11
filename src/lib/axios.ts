import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// --- ১. Public Axios (সবার জন্য উন্মুক্ত) ---
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- ২. Private Axios (টোকেনসহ সুরক্ষিত কাজের জন্য) ---
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Private Axios-এ ইন্টারসেপ্টর যোগ করা যেন প্রতিবার টোকেন পাঠাতে না হয়
axiosPrivate.interceptors.request.use(
  (config) => {
    // এখানে আপনি চাইলে ব্রাউজারের কুকি বা লোকাল স্টোরেজ থেকে টোকেন নিতে পারেন
    // তবে NextAuth ব্যবহার করলে এটি আরও অটোমেটিক করা যায়
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);