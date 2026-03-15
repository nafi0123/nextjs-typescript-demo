"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/shared/Container";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tranId = searchParams.get("id");

    return (
        <div className="bg-[#F5F0E5] min-h-screen flex items-center justify-center py-20">
            <Container>
                <div className="max-w-xl mx-auto bg-white p-10 md:p-16 shadow-sm border border-slate-100 text-center relative">
                    
                    {/* ক্যানসেল আইকন */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-red-50 p-4 rounded-full text-red-500 shadow-sm border border-red-100">
                            <XCircle size={48} strokeWidth={1.5} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-4">
                        Payment <span className="text-red-500">Cancelled</span>
                    </h1>
                    
                    <p className="text-slate-500 text-sm mb-10 leading-relaxed">
                        The transaction was cancelled. No money has been deducted from your account. 
                        You can try paying again or return to your cart.
                    </p>

                    {/* ট্রানজেকশন আইডি বক্স */}
                    {tranId && (
                        <div className="bg-slate-50 p-4 rounded mb-10 border-l-4 border-red-400">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-left">Ref ID</p>
                            <p className="font-mono text-xs font-bold text-slate-700 text-left">{tranId}</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={() => router.push("/cart")} 
                            className="bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95"
                        >
                            Back to Cart
                        </button>
                        
                        <button 
                            onClick={() => router.push("/")} 
                            className="text-slate-400 py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-black transition-all"
                        >
                            Return to Homepage
                        </button>
                    </div>

                    {/* Decorative dash border */}
                    <div className="absolute inset-4 border border-dashed border-slate-100 pointer-events-none"></div>
                </div>
            </Container>
        </div>
    );
};

export default PaymentCancel;