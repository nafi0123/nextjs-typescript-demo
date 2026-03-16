import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "LUMINA | Luxury Skincare & Beauty",
    template: "%s | LUMINA",
  },
  description: "Experience the art of clinical skincare. Curated premium beauty essentials for your daily glow.",
};

export default function RootLayout({ children }) {
  return (
    /** * ১. className="light" এবং style={{ colorScheme: 'light' }} যোগ করা হয়েছে 
     * যাতে সিস্টেম ডার্ক মোড থাকলেও ব্রাউজার আপনার সাইটকে লাইট মোডে রেন্ডার করে।
     */
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body
        /** * ২. bg-white এবং text-black যোগ করা হয়েছে যাতে ব্যাকগ্রাউন্ড সবসময় সাদা 
         * এবং টেক্সট সবসময় কালো থাকে। 
         */
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}