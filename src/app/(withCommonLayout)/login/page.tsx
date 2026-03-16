"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // --- অটো ফিল এবং লগইন ফাংশন ---
    const handleAdminAutoLogin = async () => {
        const adminEmail = "nafi2122940@gmail.com";
        const adminPass = "123456";
        
        setEmail(adminEmail);
        setPassword(adminPass);
        
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                email: adminEmail,
                password: adminPass,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid Admin Credentials!");
            } else {
                router.push("/");
            }
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false, 
            });

            if (res?.error) {
                setError("Invalid Credentials!");
            } else {
                router.push("/"); 
            }
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F2EDE4] flex flex-col items-center justify-center p-4">
            
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-medium text-[#1A1A1A] mb-4">
                    Sign in to your account
                </h1>
                <p className="text-lg text-[#1A1A1A]">
                    Or <a href="/register" className="underline font-semibold cursor-pointer">create a new account</a>
                </p>
            </div>

            <div className="w-full max-w-[550px] bg-white p-10 md:p-16 rounded-sm shadow-sm">
                
                <form onSubmit={handleLogin} className="space-y-8">
                    
                    {error && (
                        <p className="text-red-500 text-sm text-center font-medium">
                            {error}
                        </p>
                    )}

                    <div className="space-y-3">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-4 border border-slate-200 rounded-md focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-4 border border-slate-200 rounded-md focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-300"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-zinc-900 transition duration-300 mt-4 disabled:bg-zinc-500"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                {/* --- Admin Quick Login Button --- */}
                <div className="mt-8 pt-8 border-t border-slate-100">
                    <button
                        onClick={handleAdminAutoLogin}
                        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 text-slate-500 py-3 rounded-md hover:border-slate-900 hover:text-slate-900 transition-all group"
                    >
                        <ShieldCheck size={18} className="group-hover:text-blue-600" />
                        <span className="text-xs font-bold uppercase tracking-widest">Quick Admin Access</span>
                    </button>
                    <p className="text-[9px] text-center text-slate-400 mt-2 italic">
                        * Only for testing purposes
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;