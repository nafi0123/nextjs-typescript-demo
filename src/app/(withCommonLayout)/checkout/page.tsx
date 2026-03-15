"use client";

import Container from "@/components/shared/Container";
import Image from "next/image";
import { useState, useEffect } from "react";

const CheckoutPage = () => {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => {
        // শুধুমাত্র কার্ট থেকে সিলেক্ট করা আইটেমগুলো নিয়ে আসা
        const cart = JSON.parse(localStorage.getItem("user_cart") || "[]");
        // আপনি যদি CartPage এ selectedIds স্টেট ব্যবহার করেন, তবে সেটিও এখানে পাস করতে হবে
        setSelectedItems(cart); 
    }, []);

    const subtotal = selectedItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    const total = subtotal + 5.99;

    const handleSSLPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // এখানে আপনার ব্যাকএন্ডে পেমেন্ট ইনিশিয়েট করার API কল করতে হবে
        // SSLCommerz এর জন্য ব্যাকএন্ড থেকে একটি পেমেন্ট URL আসবে
        const paymentData = {
            total_amount: total,
            currency: 'BDT',
            cus_name: 'User Name',
            cus_email: 'user@example.com',
            // অন্যান্য প্রয়োজনীয় ডাটা...
        };

        toast.loading("Redirecting to SSLCommerz...");
        // API কল করে পেমেন্ট লিঙ্কে রিডাইরেক্ট করুন
    };

    return (
        <div className="bg-[#F5F0E5] min-h-screen py-20">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Shipping Form */}
                    <div className="lg:col-span-2 bg-white p-10 shadow-sm">
                        <h2 className="text-2xl font-bold mb-8">Shipping Information</h2>
                        <form className="space-y-6" onSubmit={handleSSLPayment}>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="FIRST NAME" className="border p-4 w-full" required />
                                <input type="text" placeholder="LAST NAME" className="border p-4 w-full" required />
                            </div>
                            <input type="email" placeholder="EMAIL" className="border p-4 w-full" required />
                            <input type="text" placeholder="PHONE" className="border p-4 w-full" defaultValue="017XXXXXXXX" required />
                            <input type="text" placeholder="ADDRESS" className="border p-4 w-full" required />
                            
                            <div className="bg-white border-2 border-black p-6 mt-10">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" checked readOnly className="accent-black" />
                                        <span className="font-bold">Standard Shipping (5-7 business days)</span>
                                    </div>
                                    <span className="font-bold">$5.99</span>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-black text-white py-5 mt-6 font-bold uppercase tracking-widest">
                                PROCEED TO PAY
                            </button>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1 bg-white p-8 h-fit shadow-sm">
                        <h3 className="italic font-bold text-xl mb-6">Order Summary</h3>
                        {selectedItems.map(item => (
                            <div key={item._id} className="flex gap-4 mb-4 border-b pb-4">
                                <div className="relative h-16 w-16 bg-slate-50">
                                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-sm">{item.name}</h4>
                                    <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                                </div>
                                <span className="font-bold">${item.price}</span>
                            </div>
                        ))}
                        <div className="space-y-2 pt-4">
                            <div className="flex justify-between text-slate-400 font-bold"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-slate-400 font-bold"><span>Shipping</span><span>$5.99</span></div>
                            <div className="flex justify-between text-2xl font-black pt-4"><span>Total</span><span>${total.toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CheckoutPage;