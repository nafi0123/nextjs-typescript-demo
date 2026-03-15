"use client";

import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import Image from "next/image";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ICartPageProps {
    dbOrders?: any[];
}

const CartPage = ({ dbOrders = [] }: ICartPageProps) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // ১. লোকাল স্টোরেজ থেকে ডাটা লোড করা
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user_cart") || "[]");
        setCartItems(data);
        setSelectedIds(data.map((item: any) => item._id));
        setIsLoading(false);
    }, []);

    // ২. স্টক লিমিট অনুযায়ী কোয়ান্টিটি আপডেট
    const updateQuantity = (id: string, type: "inc" | "dec") => {
        const updated = cartItems.map(item => {
            if (item._id === id) {
                const currentStock = item.stock || 0; // ডাটাবেস থেকে আসা স্টক লিমিট

                if (type === "inc") {
                    if (item.quantity >= currentStock) {
                        toast.error(`Only ${currentStock} items available in stock`);
                        return item;
                    }
                    return { ...item, quantity: item.quantity + 1 };
                }

                if (type === "dec" && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        });

        setCartItems(updated);
        localStorage.setItem("user_cart", JSON.stringify(updated));
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const removeItem = (id: string) => {
        const filtered = cartItems.filter(item => item._id !== id);
        setCartItems(filtered);
        setSelectedIds(prev => prev.filter(itemId => itemId !== id));
        localStorage.setItem("user_cart", JSON.stringify(filtered));
        toast.success("Item removed from bag");
    };

    const handleProceedToPay = () => {
        if (selectedIds.length === 0) {
            toast.error("Please select at least one item to pay");
            return;
        }
        const checkoutData = cartItems.filter(item => selectedIds.includes(item._id));
        localStorage.setItem("temp_checkout", JSON.stringify(checkoutData));
        router.push("/checkout");
    };

    const selectedItems = cartItems.filter(item => selectedIds.includes(item._id));
    const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingFee = selectedItems.length > 0 ? 5.99 : 0;

    if (isLoading) return <div className="min-h-screen bg-[#F5F0E5]" />;

    return (
        <div className="bg-[#F5F0E5] min-h-screen py-12 md:py-20 font-sans text-slate-900">
            <Container>
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight uppercase">Order Selection</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-4">
                        
                        {/* ৩. সার্ভার থেকে আসা PAID অর্ডারগুলো */}
                        {dbOrders.map((order: any) => (
                            <div key={order._id} className="bg-white p-6 md:px-10 md:py-8 flex items-center gap-6 relative shadow-sm opacity-90 border-l-4 border-green-500">
                                <div className="flex-grow flex items-center gap-6">
                                    <div className="relative h-20 w-20 bg-slate-50 flex-shrink-0">
                                        <Image src={order.items[0]?.image || "/placeholder.png"} alt="product" fill className="object-contain p-2" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: #{order.transactionId?.slice(-7).toUpperCase()}</p>
                                        <h3 className="font-bold text-base uppercase tracking-tight">{order.items[0]?.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Order History</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-4">
                                    <span className={`text-[9px] font-black px-2 py-0.5 uppercase rounded-sm ${order.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                        {order.status}
                                    </span>
                                    <p className="font-black text-xl md:text-2xl tracking-tighter">${order.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}

                        {/* ৪. লোকাল স্টোরেজ থেকে আসা UNPAID আইটেমগুলো */}
                        {cartItems.length > 0 ? cartItems.map((item) => (
                            <div 
                                key={item._id} 
                                className={`bg-white p-6 md:px-10 md:py-8 flex items-center gap-6 relative transition-all shadow-sm ${selectedIds.includes(item._id) ? 'border-l-4 border-black' : 'opacity-50 grayscale border-slate-200'}`}
                            >
                                <div className="flex-shrink-0">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedIds.includes(item._id)}
                                        onChange={() => toggleSelect(item._id)}
                                        className="w-5 h-5 accent-black cursor-pointer rounded border-slate-300" 
                                    />
                                </div>

                                <div className="flex flex-grow items-center gap-6">
                                    <div className="relative h-20 w-20 bg-[#F5F5F5] flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                                    </div>
                                    
                                    <div className="flex-grow">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 italic">New Selection</p>
                                        <h3 className="font-bold text-base md:text-lg uppercase tracking-tight">{item.name}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-3 bg-slate-50 px-2 py-1 rounded">
                                                <button onClick={() => updateQuantity(item._id, "dec")} className="text-slate-400 hover:text-black"><Minus size={12} /></button>
                                                <span className="text-xs font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item._id, "inc")} className="text-slate-400 hover:text-black"><Plus size={12} /></button>
                                            </div>
                                            <button onClick={() => removeItem(item._id)} className="text-slate-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end justify-between min-h-[80px]">
                                    <span className="bg-[#FFF1F1] text-[#E54B4B] text-[9px] font-black px-2 py-0.5 uppercase tracking-tighter rounded-sm">UNPAID</span>
                                    <p className="font-black text-xl md:text-2xl tracking-tighter mt-auto">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        )) : dbOrders.length === 0 && (
                            <div className="bg-white p-20 text-center uppercase font-bold text-slate-300 tracking-[0.3em] border-2 border-dashed border-slate-200">Bag is empty</div>
                        )}
                    </div>

                    {/* ৫. পেমেন্ট সামারি এবং নেভিগেশন বাটন */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white p-10 shadow-sm border border-slate-100 sticky top-10">
                            
                            {/* My Orders বাটন */}
                            <button 
                                onClick={() => router.push("/my-orders")}
                                className="w-full mb-6 border border-black py-3 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                            >
                                <ShoppingBag size={14} /> My Orders
                            </button>

                            <h2 className="font-bold text-xl mb-10 uppercase tracking-tight italic">Payment Summary</h2>
                            <div className="space-y-6">
                                <div className="flex justify-between text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                                    <span>Items Selected ({selectedItems.length})</span>
                                    <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                                    <span>Estimated Shipping</span>
                                    <span className="text-slate-900">${shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="pt-8 mt-10 border-t border-slate-100 flex justify-between items-end">
                                    <span className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">Total Payable</span>
                                    <span className="text-4xl font-black tracking-tighter leading-none">${(subtotal + shippingFee).toFixed(2)}</span>
                                </div>
                                <button 
                                    onClick={handleProceedToPay}
                                    disabled={selectedIds.length === 0}
                                    className="w-full bg-black text-white py-5 mt-8 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all shadow-xl active:scale-95 disabled:bg-slate-100 disabled:text-slate-300"
                                >
                                    Proceed to Pay
                                </button>
                                <p className="text-[9px] text-center text-red-400 font-bold uppercase mt-4 tracking-tighter">
                                    * Select at least one unpaid order to proceed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CartPage;