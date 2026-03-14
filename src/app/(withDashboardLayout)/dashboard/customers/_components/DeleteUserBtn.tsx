"use client";

import { Trash2 } from "lucide-react";
import { deleteUser } from "@/services/coustomers.service";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

export const DeleteUserBtn = ({ userId }: { userId: string }) => {
    
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000", // আপনার ব্ল্যাক থিমের সাথে মিল রেখে
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            // SweetAlert2 এর স্টাইল আপনার ড্যাশবোর্ডের মতো করার জন্য
            customClass: {
                title: 'text-xs font-black uppercase tracking-widest',
                htmlContainer: 'text-[10px] font-bold uppercase tracking-widest text-slate-500',
                confirmButton: 'text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-none',
                cancelButton: 'text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-none'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteUser(userId);
                
                if (res.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: res.message,
                        icon: "success",
                        confirmButtonColor: "#000",
                        customClass: {
                            title: 'text-xs font-black uppercase tracking-widest',
                            htmlContainer: 'text-[10px] font-bold uppercase tracking-widest text-slate-500',
                            confirmButton: 'text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-none',
                        }
                    });
                } else {
                    toast.error(res.message);
                }
            }
        });
    };

    return (
        <button 
            onClick={handleDelete} 
            className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm"
            title="Delete User"
        >
            <Trash2 size={16} />
        </button>
    );
};