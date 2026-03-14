"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export const updatePassword = async (formData: any) => {
    try {
        await connectDB();
        const { currentPassword, newPassword, email } = formData;

        // ১. ডাটাবেজ থেকে সরাসরি ইউজার খুঁজে বের করা
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found in DB:", email);
            return { success: false, message: "User not found!" };
        }

        // ২. বর্তমান পাসওয়ার্ড চেক (লগইন করা ইউজার কি না নিশ্চিত হওয়া)
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            console.log("❌ Current password mismatch for:", email);
            return { success: false, message: "Current password wrong!" };
        }

        // ৩. নতুন পাসওয়ার্ড হ্যাশ করা
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // ৪. সরাসরি ডাটাবেজে আপডেট করা (save() এর বদলে findOneAndUpdate নিরাপদ)
        const result = await User.findOneAndUpdate(
            { email: email },
            { $set: { password: hashedPassword } },
            { new: true }
        );

        if (result) {
            console.log("✅ Password updated successfully in DB for:", email);
            revalidatePath("/dashboard/settings");
            return { success: true, message: "Security credentials updated!" };
        }

        return { success: false, message: "Failed to update security!" };
    } catch (error: any) {
        console.error("🔥 Service Error:", error.message);
        return { success: false, message: "Internal server error!" };
    }
};