"use client";

import Container from "@/components/shared/Container";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CheckoutPage = () => {
    const { data: session } = useSession();
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter();

    useEffect(() => {
        const tempCart = JSON.parse(localStorage.getItem("temp_checkout") || "[]");
        if (tempCart.length === 0) {
            router.push("/cart");
        }
        setSelectedItems(tempCart);
    }, [router]);

    const subtotal = selectedItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    const shippingFee = 5.99;
    const total = subtotal + shippingFee;

    const handleSSLPayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        
        // লগইন করা ইউজারের ইমেইলটি প্রাধান্য পাবে
        const userEmail = session?.user?.email || formData.get("email") as string;

        const shippingDetails = {
            name: `${formData.get("firstName")} ${formData.get("lastName")}`,
            email: userEmail,
            phone: formData.get("phone"),
            address: formData.get("address"),
            city: formData.get("city") || "N/A",
        };

        const loadingToast = toast.loading("Processing payment gateway...");

        try {
            const paymentData = {
                totalAmount: total,
                userEmail: userEmail, // আপনার স্কিমা অনুযায়ী
                shippingAddress: shippingDetails,
                items: selectedItems.map(item => ({
                    productId: item._id,
                    quantity: item.quantity, 
                    price: item.price
                }))
            };

            // URL: /api/payment (axiosPrivate এ baseURL থাকলে শুধু /payment)
            const response = await axiosPrivate.post("/payment", paymentData);

            if (response.data?.url) {
                toast.dismiss(loadingToast);
                window.location.replace(response.data.url);
            } else {
                throw new Error("Payment link not found");
            }
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error(error.response?.data?.message || "Failed to initiate payment!");
            console.error("Payment Error:", error);
        }
    };

    return (
        <div className="bg-[#F5F0E5] min-h-screen py-12 md:py-20 font-sans text-slate-900">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 shadow-sm border border-slate-100">
                        <h2 className="text-3xl font-bold mb-10 uppercase tracking-tighter italic">Shipping Information</h2>
                        
                        <form className="space-y-8" onSubmit={handleSSLPayment}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">First Name</label>
                                    <input name="firstName" type="text" placeholder="John" className="w-full border-b border-slate-200 py-3 focus:border-black outline-none transition-all bg-transparent" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Last Name</label>
                                    <input name="lastName" type="text" placeholder="Doe" className="w-full border-b border-slate-200 py-3 focus:border-black outline-none transition-all bg-transparent" required />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Address</label>
                                    <input name="email" type="email" defaultValue={session?.user?.email || ""} readOnly={!!session?.user?.email} className="w-full border-b border-slate-200 py-3 focus:border-black outline-none transition-all bg-transparent text-slate-500" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phone Number</label>
                                    <input name="phone" type="text" placeholder="01XXXXXXXXX" className="w-full border-b border-slate-200 py-3 focus:border-black outline-none transition-all bg-transparent" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Address</label>
                                <input name="address" type="text" placeholder="Street, City, Zip" className="w-full border-b border-slate-200 py-3 focus:border-black outline-none transition-all bg-transparent" required />
                            </div>

                            <button type="submit" className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all shadow-2xl active:scale-[0.98]">
                                Pay Now — ${total.toFixed(2)}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 shadow-sm border border-slate-100 sticky top-10">
                            <h3 className="italic font-black text-xl mb-8 uppercase tracking-tight border-b pb-4">Order Summary</h3>
                            <div className="max-h-[350px] overflow-y-auto space-y-6">
                                {selectedItems.map(item => (
                                    <div key={item._id} className="flex gap-4 items-center border-b border-slate-50 pb-4">
                                        <div className="relative h-16 w-16 bg-[#F9F9F9] flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-[13px] uppercase truncate w-32">{item.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-black text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4 pt-6 mt-4">
                                <div className="flex justify-between text-[11px] font-bold uppercase">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold uppercase">
                                    <span>Shipping</span>
                                    <span>${shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-end pt-6 border-t-2 border-black">
                                    <span className="font-black text-xs uppercase tracking-[0.2em]">Total</span>
                                    <span className="text-4xl font-black">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CheckoutPage;