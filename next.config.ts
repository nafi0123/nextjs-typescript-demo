import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এটি যেকোনো ডোমেইন থেকে ইমেজ লোড করার অনুমতি দেয়
      },
    ],
  },
};

export default nextConfig;