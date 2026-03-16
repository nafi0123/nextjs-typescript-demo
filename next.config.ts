import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এটি যেকোনো ডোমেইন থেকে ইমেজ লোড করার অনুমতি দেয়
      },
    ],
  },
  // টাইপস্ক্রিপ্ট এরর থাকলেও বিল্ড হতে দেবে
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint এর এররগুলো বিল্ডের সময় ইগনোর করবে
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;