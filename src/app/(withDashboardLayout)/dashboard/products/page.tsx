import React from 'react';
import { getAllProducts } from '@/services/product.service';
import AddProductBtn from './_components/AddProductBtn'; 
import InventoryActions from './_components/InventoryActions'; // নতুন ক্লায়েন্ট কম্পোনেন্ট
import { Package } from 'lucide-react';

const ProductPage = async ({ 
    searchParams 
}: { 
    searchParams: Promise<{ page?: string; category?: string }> 
}) => {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const currentCategory = params.category || "";
    
    const { products, pagination } = await getAllProducts(currentPage, 8, currentCategory);

    return (
        <div className="space-y-8 animate-in fade-in duration-700 p-4 md:p-0">
            {/* Header Section */}
            <div className="bg-white p-8 border border-[#EBE3D9] flex flex-col md:flex-row justify-between items-center shadow-sm gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-black p-3 rounded-sm text-white">
                        <Package size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Inventory</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F] mt-1">
                            Total {pagination?.totalProducts || 0} Items Found
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <AddProductBtn />
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white border border-[#EBE3D9] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-max">
                        <thead className="bg-[#FEF4EC] border-b border-[#EBE3D9]">
                            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">
                                <th className="px-8 py-5">Product</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Price</th>
                                <th className="px-8 py-5">Stock</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.length > 0 ? (
                                products.map((item: any) => (
                                    <tr key={item._id} className="hover:bg-[#FDFBF9] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 p-1">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <span className="font-bold text-slate-900 uppercase text-xs tracking-tight">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category}</span>
                                        </td>
                                        <td className="px-8 py-6 font-black text-slate-900">${item.price}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-1.5 w-1.5 rounded-full ${item.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 ${item.stock > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                                                    {item.stock} Units
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {/* Client Actions: View and Delete */}
                                            <InventoryActions 
                                                productId={item._id} 
                                                productName={item.name} 
                                                productImage={item.image} 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center text-[10px] font-black uppercase tracking-widest text-slate-300">
                                        No products found in this category
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
                            href={`?page=${currentPage - 1}${currentCategory ? `&category=${currentCategory}` : ''}`}
                            className={`px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] ${!pagination.hasPrevPage ? 'pointer-events-none opacity-20' : 'hover:bg-black hover:text-white transition'}`}
                        >
                            PREV
                        </a>
                        <div className="bg-[#FEF4EC] px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] text-[#A38A6F]">
                            {pagination.currentPage} / {pagination.totalPages}
                        </div>
                        <a 
                            href={`?page=${currentPage + 1}${currentCategory ? `&category=${currentCategory}` : ''}`}
                            className={`px-6 py-3 border border-[#EBE3D9] text-[10px] font-black tracking-[0.2em] ${!pagination.hasNextPage ? 'pointer-events-none opacity-20' : 'hover:bg-black hover:text-white transition'}`}
                        >
                            NEXT
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;