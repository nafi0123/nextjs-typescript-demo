import { NextResponse } from "next/server";
import Order from "@/models/Order";
import Product from "@/models/Product";
import dbConnect from "@/lib/db";

export async function POST(req: Request) {
    try {
        // ১. ডাটাবেস কানেকশন নিশ্চিত করা
        await dbConnect();

        // SSLCommerz ডাটা সাধারণত FormData হিসেবে পাঠায়
        const formData = await req.formData();
        const data = Object.fromEntries(formData.entries());

        const tran_id = data.tran_id as string;
        const status = data.status as string;
        
        // পেমেন্ট মেথড বের করা (bKash, Nagad, etc.)
        const paymentMethod = data.card_issuer || data.card_type || "SSL-Payment";

        // ২. চেক করা পেমেন্ট ভ্যালিড কি না
        if (status === "VALID" || status === "SUCCESS") {
            // অর্ডার আপডেট করা (status এবং paymentMethod)
            const order = await Order.findOneAndUpdate(
                { transactionId: tran_id },
                { 
                    status: "PAID",
                    paymentMethod: paymentMethod 
                },
                { new: true }
            );

            if (order) {
                // ৩. স্টক আপডেট (মাইনাস করা)
                // প্রতিটি আইটেমের জন্য ইনভেন্টরি থেকে স্টক কমানো হচ্ছে
                const updatePromises = order.items.map((item: any) => {
                    return Product.findByIdAndUpdate(
                        item.productId, 
                        { $inc: { stock: -item.quantity } }
                    );
                });

                await Promise.all(updatePromises);

                // ৪. ফ্রন্টএন্ড সাকসেস পেজে রিডাইরেক্ট
                const baseUrl = process.env.Base_URL || "http://localhost:3000";
                // 303 Redirect ব্যবহার করা নিরাপদ POST রিকোয়েস্টের ক্ষেত্রে
                return NextResponse.redirect(`${baseUrl}/payment/success?id=${tran_id}`, 303);
            }
        }

        // পেমেন্ট সাকসেস না হলে ফেইল পেজে রিডাইরেক্ট
        const failUrl = process.env.Base_URL || "http://localhost:3000";
        return NextResponse.redirect(`${failUrl}/payment/fail`, 303);

    } catch (error) {
        console.error("SSL Success Route Error:", error);
        const errorUrl = process.env.Base_URL || "http://localhost:3000";
        return NextResponse.redirect(`${errorUrl}/payment/fail?message=internal_error`, 303);
    }
}