import { ShieldCheck } from "lucide-react";
import UpdateSecurityForm from "./_components/UpdateSecurityForm";
import { getServerSession } from "next-auth";
// আপনার authOptions এর পাথ অনুযায়ী ইমপোর্ট করুন (সাধারণত api/auth/[...nextauth]/route.ts এ থাকে)
// যদি সরাসরি না পান, তবে নিচের মতো করে ট্রাই করুন:
import { redirect } from "next/navigation";

const SettingsPage = async () => {
    // সার্ভার সাইড সেশন গেট করা
    const session = await getServerSession();

    // যদি কোনো কারণে সেশন না থাকে (লগইন না করা থাকে), তবে লগইন পেজে পাঠিয়ে দেবে
    if (!session?.user?.email) {
        redirect("/login");
    }

    const userEmail = session.user.email; 

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="bg-white p-8 border border-[#EBE3D9] flex flex-col md:flex-row items-center gap-6 shadow-sm justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-black p-4 rounded-sm text-white">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Security Settings</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A38A6F] mt-1">
                            Manage your administrative credentials
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Card: Admin Identity */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#FAF5F0] border border-[#EBE3D9] p-8 relative overflow-hidden h-full">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 border-2 border-black rounded-full">
                                    <ShieldCheck size={20} className="text-black" />
                                </div>
                                <h2 className="font-black uppercase tracking-widest text-xs">Admin Identity</h2>
                            </div>
                            
                            <div className="space-y-1 mb-8">
                                <p className="text-[10px] font-black uppercase text-[#A38A6F] tracking-widest">Email Address</p>
                                <p className="font-bold text-slate-900 break-all">{userEmail}</p>
                            </div>

                            <div className="inline-block bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2">
                                Authorized
                            </div>
                        </div>
                        {/* Background Decoration Icon */}
                        <ShieldCheck size={120} className="absolute -right-8 -bottom-8 text-black/5 rotate-12 pointer-events-none" />
                    </div>
                    
                    <p className="text-[10px] font-bold uppercase leading-relaxed text-slate-400 px-2 italic">
                        * Update your password regularly to keep your administrative panel secure.
                    </p>
                </div>
                
                {/* Right Side: ক্লায়েন্ট ফর্ম */}
                <UpdateSecurityForm userEmail={userEmail} />
            </div>
        </div>
    );
};

export default SettingsPage;