import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ email });
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;

          // এখানে role রিটার্ন করা হচ্ছে যাতে jwt কলব্যাক এটি পায়
          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email, 
            role: user.role // ডাটাবেজ থেকে রোল নেওয়া হচ্ছে
          };
        } catch (error) {
          console.error("Auth Error:", error);
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