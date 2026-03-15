import React from 'react';
import { getAllOrders } from '@/services/order.service';
import Container from '@/components/shared/Container';
import OrdersSearch from './_components/OrdersSearch';
import { ShoppingBag, CheckCircle2, Clock, Hash } from 'lucide-react';

const OrdersPage = async ({ 
    searchParams 
}: { 
    searchParams: Promise<{ page?: string; search?: string }> 
}) => {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const searchTerm = params.search || "";
    
    const { data: orders, pagination } = await getAllOrders(currentPage, 8, searchTerm);

    return (
        <div className="space-y-8 animate-in fade-in duration-700 p-4 md:p-0  min-h-screen">
            <Container>
                {/* Header & Search Area */}
                <div className="bg-white p-8 border border-[#EBE3D9] flex flex-col md:flex-row justify-between items-center shadow-sm gap-6 mt-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-black p-3 rounded-sm text-white">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-slate-900 leading-none">Orders</h1>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F] mt-1">
                                {pagination?.totalOrders || 0} Transactions Found
                            </p>
                        </div>
                    </div>
                    
                    <OrdersSearch defaultValue={searchTerm} />
                </div>

                {/* Orders Table Area */}
                <div className="bg-white border border-[#EBE3D9] overflow-hidden shadow-sm mt-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead className="bg-[#FEF4EC] border-b border-[#EBE3D9]">
                                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">
                                    <th className="px-8 py-5">Transaction ID</th>
                                    <th className="px-8 py-5">Customer Info</th>
                                    <th className="px-8 py-5">Total</th>
                                    <th className="px-8 py-5">Payment Status</th>
                                    <th className="px-8 py-5 text-right">Order Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {orders && orders.length > 0 ? (
                                    orders.map((order: any) => (
                                        <tr key={order._id} className="hover:bg-[#FDFBF9] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <Hash size={14} className="text-[#A38A6F]" />
                                                    <span className="font-bold text-slate-900 uppercase text-xs tracking-tight">
                                                        {order.transactionId}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                                        {order.shippingAddress?.name || "Nafi Bukhari"}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-slate-400 lowercase italic">
                                                        {order.userEmail}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-black text-slate-900">
                                                ৳{order.totalAmount}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-1.5 w-1.5 rounded-full ${order.status === 'PAID' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 ${order.status === 'PAID' ? 'text-green-700 bg-green-50 border border-green-100' : 'text-amber-700 bg-amber-50 border border-amber-100'}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                                        day: '2-digit', month: 'short', year: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-20 text-center text-[10px] font-black uppercase tracking-widest text-slate-300 italic">
                                            No matching orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pb-10">
                        <div className="flex items-center gap-2">
                            <a 
                                href={`?page=${currentPage - 1}${searchTerm ? `&search=${searchTerm}` : ''}`}
                                className={`px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] bg-white ${!pagination.hasPrevPage ? 'pointer-events-none opacity-20' : 'hover:bg-black hover:text-white transition'}`}
                            >
                                PREV
                            </a>
                            <div className="bg-[#FEF4EC] px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] text-[#A38A6F]">
                                {pagination.currentPage} / {pagination.totalPages}
                            </div>
                            <a 
                                href={`?page=${currentPage + 1}${searchTerm ? `&search=${searchTerm}` : ''}`}
                                className={`px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] bg-white ${!pagination.hasNextPage ? 'pointer-events-none opacity-20' : 'hover:bg-black hover:text-white transition'}`}
                            >
                                NEXT
                            </a>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default OrdersPage;