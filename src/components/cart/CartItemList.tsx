"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartItemList({ dbOrders }: { dbOrders: any[] }) {
    const [localCart, setLocalCart] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        // Local Storage থেকে ডেটা আনা
        const data = JSON.parse(localStorage.getItem("user_cart") || "[]");
        setLocalCart(data);
    }, []);

    const subtotal = localCart
        .filter(item => selectedIds.includes(item._id))
        .reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
                {/* --- ১. সার্ভার/ডাটাবেস ডেটা (PAID/UNPAID) --- */}
                {dbOrders.map((order) => (
                    <div key={order._id} className="bg-white p-6 flex items-center gap-6 relative shadow-sm opacity-90">
                        <div className="flex-grow flex items-center gap-6">
                            <div className="relative h-20 w-20 bg-slate-50">
                                <Image src={order.items[0]?.image || "/placeholder.png"} alt="product" fill className="object-contain p-2" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: #{order.transactionId?.slice(-7).toUpperCase()}</p>
                                <h3 className="font-bold text-base uppercase">{order.items[0]?.name}</h3>
                                <p className="text-xs text-slate-500 mt-1 italic">Order History</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-4">
                            <span className={`text-[9px] font-black px-2 py-0.5 uppercase rounded-sm ${order.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                {order.status}
                            </span>
                            <p className="font-black text-xl tracking-tighter">${order.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                ))}

                {/* --- ২. লোকাল স্টোরেজ ডেটা (নতুন আইটেম) --- */}
                {localCart.map((item) => (
                    <div key={item._id} className="bg-white p-6 flex items-center gap-6 relative shadow-sm">
                        <input 
                            type="checkbox" 
                            onChange={() => {
                                setSelectedIds(prev => prev.includes(item._id) ? prev.filter(id => id !== item._id) : [...prev, item._id]);
                            }}
                            className="w-5 h-5 accent-black cursor-pointer" 
                        />
                        <div className="flex-grow flex items-center gap-6">
                            <div className="relative h-20 w-20 bg-[#F5F5F5]">
                                <Image src={item.image} alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                            </div>
                            <div className="flex-grow">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">In Bag</p>
                                <h3 className="font-bold text-base uppercase">{item.name}</h3>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs font-bold bg-slate-100 px-2 py-1">Qty: {item.quantity}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="bg-slate-100 text-slate-400 text-[9px] font-black px-2 py-0.5 uppercase rounded-sm mb-auto">NEW</span>
                            <p className="font-black text-xl tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- ৩. পেমেন্ট সামারি --- */}
            <div className="lg:col-span-1">
                <div className="bg-white p-10 shadow-sm sticky top-10">
                    <h2 className="font-bold text-xl mb-10 uppercase tracking-tight italic">Payment Summary</h2>
                    <div className="space-y-6">
                        <div className="flex justify-between text-[11px] text-slate-400 font-bold uppercase">
                            <span>Selected Items ({selectedIds.length})</span>
                            <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="pt-8 mt-10 border-t flex justify-between items-end">
                            <span className="font-bold text-xs uppercase mb-1">Total Payable</span>
                            <span className="text-4xl font-black tracking-tighter">${subtotal.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" className="w-full bg-black text-white py-5 mt-8 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-zinc-800 transition-all">
                            Proceed to Pay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}