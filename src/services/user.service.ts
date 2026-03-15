"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// প্রোফাইল আপডেট অ্যাকশন
export async function updateProfile(email: string, data: { name: string; phone: string }) {
    try {
        await dbConnect();
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name: data.name, phone: data.phone },
            { new: true }
        );
        if (!updatedUser) return { success: false, message: "User not found" };
        revalidatePath("/dashboard/my-profile");
        return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
}

// পাসওয়ার্ড আপডেট অ্যাকশন
export const updatePassword = async (data: any) => {
    try {
        await dbConnect();
        const { currentPassword, newPassword, email } = data;

        const user = await User.findOne({ email });
        if (!user) return { success: false, message: "User not found!" };

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return { success: false, message: "Current password wrong!" };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } }
        );

        revalidatePath("/dashboard/my-profile");
        return { success: true, message: "Security credentials updated!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Internal server error!" };
    }
};