"use server";

import connectDB from "@/lib/db";
import Product from "@/models/Product"; 


export const getHomeRecentProducts = async () => {
    try {
        await connectDB();

        // ১. ডাটাবেজ থেকে লেটেস্ট ৬টি প্রোডাক্ট রিট্রাইভ করা
        // .lean() ব্যবহার করা হয়েছে পারফরম্যান্স এবং সিরিয়ালাইজেশনের জন্য
        const products = await Product.find({})
            .sort({ createdAt: -1 })
            .limit(8)
            .lean();

        // ২. Next.js Server Component এ পাঠানোর জন্য ডাটা সিরিয়ালাইজ করা
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error("Error in recentHome service:", error);
        return [];
    }
};

export const getSingleProduct = async (id: string) => {
    try {
        await connectDB();
        // ID ভ্যালিড কি না চেক করা ভালো
        const product = await Product.findById(id).lean();
        if (!product) return null;
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        console.error("Single Product Fetch Error:", error);
        return null;
    }
};