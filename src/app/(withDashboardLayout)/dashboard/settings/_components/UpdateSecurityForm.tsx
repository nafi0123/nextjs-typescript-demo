"use client";

import { useState } from "react";
import { Lock, Save, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { updatePassword } from "@/services/user.service";

const UpdateSecurityForm = ({ userEmail }: { userEmail: string }) => {
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (data.newPassword !== data.confirmPassword) {
            return toast.error("New passwords do not match!");
        }

        if ((data.newPassword as string).length < 6) {
            return toast.error("Password must be at least 6 chars!");
        }

        setLoading(true);
        try {
            const res = await updatePassword({ ...data, email: userEmail });
            if (res.success) {
                toast.success(res.message);
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            toast.error("Failed to update!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:col-span-8 bg-white border border-[#EBE3D9] p-10 shadow-sm">
            <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                    <Lock size={18} className="text-slate-400" />
                    <h2 className="font-black uppercase tracking-widest text-sm">Change Password</h2>
                </div>
                <button 
                    type="button" 
                    onClick={() => setShowPass(!showPass)}
                    className="text-slate-400 hover:text-black transition-colors"
                >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">Current Password</label>
                    <input 
                        name="currentPassword"
                        type={showPass ? "text" : "password"} 
                        required
                        placeholder="••••••••" 
                        className="w-full bg-[#F9F9F9] border-0 border-b-2 border-transparent focus:border-black focus:bg-white p-4 outline-none transition-all font-bold text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2 group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">New Password</label>
                        <input 
                            name="newPassword"
                            type={showPass ? "text" : "password"} 
                            required
                            placeholder="MIN 6 CHARS" 
                            className="w-full bg-[#F9F9F9] border-0 border-b-2 border-transparent focus:border-black focus:bg-white p-4 outline-none transition-all font-bold text-sm uppercase"
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F]">Confirm New Password</label>
                        <input 
                            name="confirmPassword"
                            type={showPass ? "text" : "password"} 
                            required
                            placeholder="RE-TYPE NEW" 
                            className="w-full bg-[#F9F9F9] border-0 border-b-2 border-transparent focus:border-black focus:bg-white p-4 outline-none transition-all font-bold text-sm uppercase"
                        />
                    </div>
                </div>

                <button 
                    disabled={loading}
                    type="submit"
                    className="bg-black text-white px-10 py-5 flex items-center gap-3 hover:bg-slate-800 transition-all disabled:bg-slate-400 group"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        {loading ? "Updating..." : "Update Security"}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default UpdateSecurityForm;