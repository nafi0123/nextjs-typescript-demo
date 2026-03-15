import { NextResponse } from "next/server";
import Order from "@/models/Order";
import dbConnect from "@/lib/db";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const formData = await req.formData();
        const tran_id = formData.get("tran_id") as string;

        // ১. ডাটাবেসে স্ট্যাটাস FAILED বা CANCELLED করা
        const updatedOrder = await Order.findOneAndUpdate(
            { transactionId: tran_id },
            { status: "CANCELLED" }, // আপনার পছন্দমতো FAILED ও দিতে পারেন
            { new: true }
        );

        const baseUrl = process.env.Base_URL || "http://localhost:3000";

        if (updatedOrder) {
            // ২. ফ্রন্টএন্ডের ক্যানসেল পেজে রিডাইরেক্ট করা
            return NextResponse.redirect(`${baseUrl}/payment/cancel?id=${tran_id}`, 303);
        }

        return NextResponse.redirect(`${baseUrl}/cart`, 303);

    } catch (error) {
        console.error("Cancel Route Error:", error);
        return NextResponse.redirect(`${process.env.Base_URL}/cart`, 303);
    }
}