import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

    // যদি ড্যাশবোর্ড পেজ হয় এবং ইউজার এডমিন না হয়, তবে তাকে হোমে পাঠিয়ে দাও
    if (isDashboardPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // টোকেন না থাকলে লগইন পেজে পাঠাবে
    },
  }
);

// কোন কোন রুট গুলো প্রোটেক্ট করতে চান তা এখানে বলে দিন
export const config = {
  matcher: ["/dashboard/:path*",'/payment/success', '/payment/cancel', '/my-profile'],
};