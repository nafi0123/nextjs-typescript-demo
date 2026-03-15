"use server";

import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function getUserOrders(email: string, page: number = 1, limit: number = 5) {
    try {
        await dbConnect();

        // কতগুলো অর্ডার স্কিপ করতে হবে তার হিসাব
        const skip = (page - 1) * limit;

        // ১. ওই ইউজারের মোট অর্ডারের সংখ্যা বের করা (টোটাল পেজ ক্যালকুলেশনের জন্য)
        const totalOrders = await Order.countDocuments({ userEmail: email });

        // ২. পেজিনেশন সহ অর্ডারগুলো কুয়েরি করা
        const orders = await Order.find({ userEmail: email })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return {
            orders: JSON.parse(JSON.stringify(orders)),
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: page
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { orders: [], totalOrders: 0, totalPages: 0, currentPage: page };
    }
}