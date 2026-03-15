import { NextResponse } from "next/server";
import Order from "@/models/Order";
import dbConnect from "@/lib/db";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // ১. ট্রানজেকশন আইডি
        const transactionId = `SM-${Date.now()}`;

        // ২. ডাটাবেসে অর্ডার সেভ
        const newOrder = new Order({
            transactionId,
            userEmail: body.userEmail, // সেশন ইমেইল
            items: body.items,         // কোয়ান্টিটি সহ
            totalAmount: body.totalAmount,
            status: "PENDING",
            shippingAddress: body.shippingAddress
        });
        await newOrder.save();

        // ৩. SSLCommerz এর জন্য ডাটা
        const paymentData = new URLSearchParams();
        paymentData.append('store_id', process.env.STORE_ID!);
        paymentData.append('store_passwd', process.env.STORE_PASSWORD!);
        paymentData.append('total_amount', body.totalAmount.toString());
        paymentData.append('currency', 'BDT');
        paymentData.append('tran_id', transactionId);

        // রিডাইরেক্ট ইউআরএল ফিক্স
        const baseUrl = process.env.Base_URL || "http://localhost:3000";
        paymentData.append('success_url', `${baseUrl}/api/payment/success?id=${transactionId}`);
        paymentData.append('fail_url', `${baseUrl}/api/payment/fail`);
        paymentData.append('cancel_url', `${baseUrl}/api/payment/cancel`);

        // কাস্টমার ইনফো
        const addr = body.shippingAddress;
        paymentData.append('cus_name', addr.name || 'Customer');
        paymentData.append('cus_email', body.userEmail);
        paymentData.append('cus_add1', addr.address || 'N/A');
        paymentData.append('cus_city', 'Dhaka');
        paymentData.append('cus_country', 'Bangladesh');
        paymentData.append('cus_phone', addr.phone || '01700000000');

        paymentData.append('shipping_method', 'NO');
        paymentData.append('product_name', 'Seoul Mirage Products');
        paymentData.append('product_category', 'Skincare');
        paymentData.append('product_profile', 'general');

        // ৪. SSLCommerz গেটওয়ে রিকোয়েস্ট
        const authResponse = await fetch(process.env.SSL_PAYMENT_URL!, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: paymentData
        });

        const result = await authResponse.json();

        if (result?.status === 'SUCCESS' && result?.GatewayPageURL) {
            return NextResponse.json({ url: result.GatewayPageURL });
        } else {
            return NextResponse.json({ 
                error: result?.failedreason || "SSL Initialization Failed" 
            }, { status: 400 });
        }

    } catch (error: any) {
        console.error("Payment API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}