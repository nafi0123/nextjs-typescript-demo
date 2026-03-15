import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export const getOrders = async () => {
    await dbConnect();
    // এখানে lean() ব্যবহার করলে ডাটাবেস থেকে সরাসরি প্লেইন অবজেক্ট আসবে যা সার্ভার কম্পোনেন্টের জন্য ভালো
    return await Order.find({}).sort({ createdAt: -1 }).lean();
};