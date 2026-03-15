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

          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email, 
            role: user.role,
            phone: user.phone || "" // ফোন নম্বরটি এখানে যোগ করুন
          };
        } catch (error) {
          console.error("🔥 Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // লগইনের সময় ডাটা সেট করা
      if (user) {
        token.role = user.role;
        token.phone = user.phone;
      }

      // ক্লায়েন্ট থেকে update() কল করলে ডাটা টোকেনে আপডেট করা
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.phone = session.user.phone;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.name = token.name;
        // সেশনে কাস্টম ফোন ডাটা সেট করা
        (session.user as any).phone = token.phone;
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