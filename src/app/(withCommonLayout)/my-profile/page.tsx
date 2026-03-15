"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Lock, Camera } from "lucide-react";
import { updatePassword, updateProfile } from "@/services/user.service";

const MyProfile = () => {
    const { data: session, update } = useSession();
    const [profileLoading, setProfileLoading] = useState(false);
    const [passLoading, setPassLoading] = useState(false);
    
    const [profileData, setProfileData] = useState({ name: "", phone: "" });
    const [passData, setPassData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    // সেশন থেকে ডাটা নিয়ে ইনপুট ফিল্ড পপুলেট করা
    useEffect(() => {
        if (session?.user) {
            setProfileData({
                name: session.user.name || "",
                phone: (session.user as any).phone || ""
            });
        }
    }, [session]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);
        
        try {
            const res = await updateProfile(session?.user?.email!, profileData);
            
            if (res.success) {
                // ১. সেশন ডাটা আপডেট করা (এটি করলে NextAuth এর কলব্যাক রান হবে)
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        name: profileData.name,
                        phone: profileData.phone
                    },
                });
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Update failed!");
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passData.newPassword !== passData.confirmPassword) {
            return toast.error("Confirm password doesn't match!");
        }
        setPassLoading(true);
        const res = await updatePassword({ ...passData, email: session?.user?.email });
        if (res.success) {
            toast.success(res.message);
            setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            toast.error(res.message);
        }
        setPassLoading(false);
    };

    return (
        <div className="bg-[#F5F0E5] min-h-screen py-10 md:py-20">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-10">My Account</h1>

                {/* Profile Section */}
                <div className="space-y-10 mb-20">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b border-slate-200 pb-2 inline-block">User Information</h2>
                    
                    

                    <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                            <input 
                                type="text" 
                                value={profileData.name} 
                                onChange={(e)=>setProfileData({...profileData, name: e.target.value})} 
                                className="w-full p-4 border border-slate-200 focus:outline-none focus:border-black bg-white font-bold text-sm shadow-sm" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email (Fixed)</label>
                            <input type="email" value={session?.user?.email || ""} disabled className="w-full p-4 border border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed outline-none font-bold text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</label>
                            <input 
                                type="text" 
                                value={profileData.phone} 
                                onChange={(e)=>setProfileData({...profileData, phone: e.target.value})} 
                                className="w-full p-4 border border-slate-200 focus:outline-none focus:border-black bg-white font-bold text-sm shadow-sm" 
                            />
                        </div>
                        <div className="md:col-span-2 pt-4">
                            <button type="submit" disabled={profileLoading} className="bg-black text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50">
                                {profileLoading ? "Updating..." : "Update Profile"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Password Section */}
                <div className="space-y-10 border-t border-slate-200 pt-16">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <Lock size={16} /> Change Password
                    </h2>

                    <form onSubmit={handlePasswordUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Password</label>
                            <input type="password" value={passData.currentPassword} onChange={(e)=>setPassData({...passData, currentPassword: e.target.value})} className="w-full p-4 border border-slate-200 focus:outline-none focus:border-black bg-white font-bold text-sm shadow-sm" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">New Password</label>
                            <input type="password" value={passData.newPassword} onChange={(e)=>setPassData({...passData, newPassword: e.target.value})} className="w-full p-4 border border-slate-200 focus:outline-none focus:border-black bg-white font-bold text-sm shadow-sm" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Password</label>
                            <input type="password" value={passData.confirmPassword} onChange={(e)=>setPassData({...passData, confirmPassword: e.target.value})} className="w-full p-4 border border-slate-200 focus:outline-none focus:border-black bg-white font-bold text-sm shadow-sm" required />
                        </div>
                        <div className="md:col-span-3 pt-4">
                            <button type="submit" disabled={passLoading} className="bg-black text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95">
                                {passLoading ? "Changing..." : "Change Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;