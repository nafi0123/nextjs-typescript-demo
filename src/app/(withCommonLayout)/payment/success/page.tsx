"use client";
import { useEffect } from "react";

const PaymentSuccess = () => {
    useEffect(() => {
        // পেমেন্ট সফল হওয়ার পর লোকাল স্টোরেজ থেকে কার্ট রিমুভ করা
        localStorage.removeItem("user_cart");
        // আপনি যদি নির্দিষ্ট কোনো কী ব্যবহার করেন সেটিও রিমুভ করুন
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
            <p>Your order is now being processed.</p>
            <button 
                onClick={() => window.location.href = "/dashboard"} 
                className="mt-5 bg-black text-white px-6 py-2"
            >
                Go to Orders
            </button>
        </div>
    );
};

export default PaymentSuccess;