"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

// ১. ডাটা ফেচিং ফাংশনকে ক্যাশ করা
export const getAllUsers = unstable_cache(
    async (page: number = 1, limit: number = 10, searchTerm: string = "") => {
        try {
            await connectDB();
            const skip = (page - 1) * limit;

            const query = searchTerm 
                ? { email: { $regex: searchTerm, $options: "i" } } 
                : {};

            const users = await User.find(query)
                .select("-password")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            const totalUsers = await User.countDocuments(query);
            const totalPages = Math.ceil(totalUsers / limit);

            return {
                users: JSON.parse(JSON.stringify(users)),
                pagination: {
                    totalUsers,
                    totalPages,
                    currentPage: page,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                }
            };
        } catch (error) {
            console.error("Error fetching users:", error);
            return { users: [], pagination: null };
        }
    },
);


export const updateUserRole = async (userId: string, newRole: string) => {
    try {
        await connectDB();

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: newRole },
            { new: true }
        );

        if (!updatedUser) {
            return { success: false, message: "User not found" };
        }

        // ২. ক্যাশ ক্লিয়ার করা (খুবই জরুরি)
        // revalidateTag ব্যবহার করলে "users" ট্যাগের আন্ডারে থাকা সব ক্যাশ ডিলিট হয়ে নতুন ডাটা আসবে
        revalidateTag("users"); 
        revalidatePath("/dashboard/customers");

        return { 
            success: true, 
            message: `User is now an ${newRole}` 
        };
    } catch (error) {
        console.error("Error updating role:", error);
        return { success: false, message: "Failed to update role" };
    }
};


export const deleteUser = async (userId: string) => {
    try {
        await connectDB();
        await User.findByIdAndDelete(userId);
        
        // ডিলিট করার পর ক্যাশ ক্লিয়ার করা
        revalidateTag("users");
        revalidatePath("/dashboard/customers");
        
        return { success: true, message: "User deleted successfully" };
    } catch (error) {
        console.error("Delete error:", error);
        return { success: false, message: "Failed to delete user" };
    }
};