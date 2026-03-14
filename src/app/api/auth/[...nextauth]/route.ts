import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.log("❌ User not found with this email");
            return null;
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          
          if (!passwordMatch) {
            console.log("❌ Password did not match");
            return null;
          }

          // সাকসেস হলে ডাটা রিটার্ন
          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email, 
            role: user.role 
          };
        } catch (error) {
          console.error("🔥 Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // ১. টোকেনের ভেতরে রোল সেট করা
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // ২. সেশনের ভেতরে রোল পাস করা যাতে ক্লায়েন্ট সাইডে (useSession) এটি পাওয়া যায়
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };