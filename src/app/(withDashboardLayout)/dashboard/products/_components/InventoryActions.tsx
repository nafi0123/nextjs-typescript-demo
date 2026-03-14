"use client";

import { Eye, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { deleteProduct } from "@/services/product.service";

interface ActionsProps {
  productId: string;
  productName: string;
  productImage: string;
}

const InventoryActions = ({ productId, productName, productImage }: ActionsProps) => {
  
  // ইমেজ দেখার ফাংশন (Eye Icon)
  const handleView = () => {
    Swal.fire({
      title: productName.toUpperCase(),
      imageUrl: productImage,
      imageAlt: productName,
      imageHeight: 300,
      showConfirmButton: false,
      background: "#fff",
      customClass: {
        title: "text-xl font-black tracking-tighter uppercase",
        popup: "rounded-none shadow-2xl border border-slate-100",
      },
    });
  };

  // ডিলিট করার ফাংশন (Trash Icon)
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "ARE YOU SURE?",
      text: "THIS PRODUCT WILL BE REMOVED PERMANENTLY!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES, DELETE",
      cancelButtonText: "CANCEL",
      background: "#fff",
      customClass: {
        title: "font-black tracking-tighter uppercase",
        popup: "rounded-none",
        confirmButton: "rounded-none px-8 py-3 text-[10px] font-black uppercase tracking-widest",
        cancelButton: "rounded-none px-8 py-3 text-[10px] font-black uppercase tracking-widest",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteProduct(productId);
        if (res.success) {
          Swal.fire({
            title: "DELETED!",
            text: res.message,
            icon: "success",
            confirmButtonColor: "#000",
            customClass: { popup: "rounded-none" },
          });
        }
      } catch (error) {
        Swal.fire("ERROR!", "FAILED TO DELETE PRODUCT", "error");
      }
    }
  };

  return (
    <div className="flex justify-end gap-4 text-slate-300">
      <button 
        onClick={handleView}
        className="hover:text-black transition-colors"
      >
        <Eye size={18} />
      </button>
      <button 
        onClick={handleDelete}
        className="hover:text-red-500 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default InventoryActions;