"use client";

import { useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { addProduct } from "@/services/product.service";
import { toast } from "react-hot-toast";
import axios from "axios"; // সরাসরি axios ইমপোর্ট করা হয়েছে base URL কনফ্লিক্ট এড়াতে

const AddProductModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState("");

    if (!isOpen) return null;

    // ইমেজ আপলোড ফাংশন (Cloudinary)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImagePreview(URL.createObjectURL(file));
        setUploading(true);

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "inventory_preset"); // আপনার দেওয়া সঠিক প্রিসেট

        try {
            // সরাসরি axios ব্যবহার করছি যাতে useAxiosPublic এর baseURL এখানে ঝামেলা না করে
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/dquetvnjc/image/upload`, 
                data
            );
            
            if (res.data.secure_url) {
                setImageUrl(res.data.secure_url);
                toast.success("Photo uploaded successfully!");
            }
        } catch (err: any) {
            console.error("Cloudinary Error Detail:", err.response?.data || err.message);
            toast.error(err.response?.data?.error?.message || "Image upload failed!");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!imageUrl) {
            return toast.error("Please upload a photo first");
        }

        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const productData = Object.fromEntries(formData.entries());
        
        // ফাইনাল ডাটাতে আপলোড হওয়া ইমেজ URL যোগ করা
        productData.image = imageUrl;

        try {
            const res = await addProduct(productData);
            if (res.success) {
                toast.success(res.message || "Product added!");
                setImagePreview(null);
                setImageUrl("");
                onClose(); // সফলভাবে অ্যাড হলে মোডাল বন্ধ হবে
            } else {
                toast.error(res.message || "Failed to add product");
            }
        } catch (error) {
            toast.error("Process failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[500px] p-10 relative shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute right-6 top-6 text-slate-300 hover:text-black transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-black uppercase tracking-tighter mb-10">New Product</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Image Area */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Photo</label>
                        <div className="relative border-2 border-dashed border-slate-100 p-4 flex flex-col items-center justify-center min-h-[140px] hover:border-black transition-colors cursor-pointer group">
                            {imagePreview ? (
                                <img src={imagePreview} className="w-full h-32 object-contain" alt="Preview" />
                            ) : (
                                <div className="text-center">
                                    <Upload className="mx-auto text-slate-300 group-hover:text-black mb-2" size={24} />
                                    <p className="text-[10px] font-black uppercase text-slate-400">Select Image</p>
                                </div>
                            )}
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                            />
                            {uploading && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-black" size={20} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-1 border-b-2 border-slate-100 focus-within:border-black transition-colors">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Name</label>
                        <input name="name" required placeholder="NAME" className="w-full py-2 outline-none font-bold uppercase text-xs" />
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1 border-b-2 border-slate-100 focus-within:border-black transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price ($)</label>
                            <input name="price" type="number" step="0.01" required placeholder="0.00" className="w-full py-2 outline-none font-bold text-xs" />
                        </div>
                        <div className="space-y-1 border-b-2 border-slate-100 focus-within:border-black transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock</label>
                            <input name="stock" type="number" required placeholder="0" className="w-full py-2 outline-none font-bold text-xs" />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                        <select name="category" required className="w-full border-b-2 border-slate-100 py-3 outline-none focus:border-black font-black uppercase text-[10px] appearance-none bg-transparent cursor-pointer">
                            <option value="SKINCARE">SKINCARE</option>
                            <option value="LIPSTICKS">LIPSTICKS</option>
                            <option value="FRAGRANCE">FRAGRANCE</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                        <textarea 
                            name="description" 
                            required 
                            placeholder="TELL MORE ABOUT THE PRODUCT..." 
                            className="w-full border-2 border-slate-100 p-4 min-h-[100px] outline-none focus:border-black font-bold text-xs uppercase placeholder:text-slate-200" 
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={loading || uploading}
                        type="submit" 
                        className="w-full bg-black text-white py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-800 transition-all disabled:bg-slate-400 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : "Publish Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;