"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddProductModal from "./AddProductModal";

const InventoryHeader = ({ totalItems }: { totalItems: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-white p-8 border border-[#EBE3D9] flex flex-col md:flex-row justify-between items-center shadow-sm gap-6">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                        Inventory
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F] mt-3">
                        Total {totalItems} items registered
                    </p>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-95"
                >
                    <Plus size={16} /> Add Product
                </button>
            </div>

            <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default InventoryHeader;