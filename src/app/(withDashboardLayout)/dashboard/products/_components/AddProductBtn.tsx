"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddProductModal from "./AddProductModal";

const AddProductBtn = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-slate-800 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-95 w-full md:w-auto justify-center"
            >
                <Plus size={16} /> Add Product
            </button>

            <AddProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default AddProductBtn;