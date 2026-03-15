"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [transactionId, setTransactionId] = useState<string | null>(null);

    useEffect(() => {
        // ১. URL থেকে ট্রানজেকশন আইডি নেওয়া
        const id = searchParams.get("id");
        if (id) {
            setTransactionId(id);
        }

        // ২. লোকাল স্টোরেজ থেকে কার্ট এবং টেম্প ডাটা রিমুভ করা
        localStorage.removeItem("user_cart");
        localStorage.removeItem("temp_checkout");
        
    }, [searchParams]);

    return (
        <div className="bg-[#F5F0E5] min-h-screen flex items-center justify-center py-20">
            <Container>
                <div className="max-w-2xl mx-auto bg-white p-10 md:p-16 shadow-sm border border-slate-100 text-center relative">
                    
                    {/* সাকসেস আইকন */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-[#789461] p-4 rounded-full text-white shadow-lg">
                            <CheckCircle size={48} strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* মেইন মেসেজ */}
                    <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-4">
                        Your payment has been <span className="text-[#789461]">received!</span>
                    </h1>
                    
                    <p className="text-slate-500 text-sm md:text-base mb-10 leading-relaxed max-w-md mx-auto">
                        Please check your email for a payment confirmation & invoice. 
                        We'll start processing your order right away.
                    </p>

                    {/* অর্ডার ডিটেইলস কার্ড */}
                    <div className="bg-slate-50 p-6 rounded-lg mb-10 text-left space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</span>
                            <span className="font-mono font-bold text-slate-800">{transactionId || "Processing..."}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Status</span>
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold uppercase">Paid</span>
                        </div>
                    </div>

                    {/* অ্যাকশন বাটন */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
        
                        
                        <button 
                            onClick={() => router.push("/")} 
                            className="bg-transparent border border-slate-200 text-black px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-slate-50 transition-all"
                        >
                            Continue Shopping
                        </button>
                    </div>

                    {/* ডেকোরেটিভ বর্ডার */}
                    <div className="absolute inset-4 border border-dashed border-slate-200 pointer-events-none opacity-50"></div>
                </div>
            </Container>
        </div>
    );
};

export default PaymentSuccess;