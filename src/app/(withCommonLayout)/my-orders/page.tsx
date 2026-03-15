"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Container from "@/components/shared/Container";
import { getUserOrders } from "@/services/myOrder.service";

const MyOrders = () => {
    const { data: session } = useSession();
    const [orders, setOrders] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            if (session?.user?.email) {
                setLoading(true);
                try {
                    const result = await getUserOrders(session.user.email, currentPage, limit);
                    if (result && Array.isArray(result.orders)) {
                        setOrders(result.orders);
                        setTotalPages(result.totalPages || 1);
                    } else {
                        setOrders([]);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                    setOrders([]);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchOrders();
    }, [session, currentPage]);

    return (
        <div className="bg-[#F5F0E5] min-h-screen py-12 md:py-20 font-sans text-slate-900">
            <Container>
                <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic border-b-4 border-black inline-block pb-2">
                    Order History
                </h2>

                {loading ? (
                    <div className="py-20 text-center font-black uppercase italic tracking-widest animate-pulse">Loading Records...</div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {orders?.length > 0 ? (
                                orders.map((order) => (
                                    <div key={order._id} className="bg-white p-6 md:p-8 shadow-sm border border-slate-100 relative group overflow-hidden">
                                        
                                        {/* Status Sidebar Color */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                            order.status === 'PAID' ? 'bg-[#789461]' : 
                                            order.status === 'CANCELLED' ? 'bg-red-500' : 'bg-amber-400'
                                        }`}></div>

                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            {/* Order Info */}
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction ID</p>
                                                <p className="font-mono font-bold text-slate-800 tracking-tighter">{order.transactionId}</p>
                                                <p className="text-[11px] font-bold text-slate-400 uppercase">Method: {order.paymentMethod || "N/A"}</p>
                                            </div>

                                            {/* Amount and Status */}
                                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 border-t md:border-t-0 pt-4 md:pt-0">
                                                <div className="text-left md:text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Paid</p>
                                                    <p className="text-2xl font-black tracking-tighter">${order.totalAmount?.toFixed(2)}</p>
                                                </div>

                                                {/* Status Badge */}
                                                <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full ${
                                                    order.status === 'PAID' ? 'bg-green-50 text-green-700 border border-green-100' : 
                                                    order.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border border-red-100' : 
                                                    'bg-amber-50 text-amber-600 border border-amber-100'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white border border-slate-100 italic text-slate-400 uppercase tracking-widest text-xs font-bold">
                                    No records found in your account.
                                </div>
                            )}
                        </div>

                        {/* Pagination Buttons */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-12">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-6 py-3 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 hover:bg-black hover:text-white transition-all active:scale-95 shadow-sm"
                                >
                                    Prev
                                </button>
                                
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {currentPage} / {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-6 py-3 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 hover:bg-black hover:text-white transition-all active:scale-95 shadow-sm"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default MyOrders;