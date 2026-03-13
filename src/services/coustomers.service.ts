"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";

export const getAllUsers = async () => {
    try {
        await connectDB();
        // lean() ব্যবহার করা হয়েছে পারফরম্যান্সের জন্য এবং plain object পাওয়ার জন্য
        const users = await User.find({}).select("-password").sort({ createdAt: -1 }).lean();
        
        // MongoDB Object ID কে স্ট্রিং এ কনভার্ট করে রিটার্ন করছি
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};