"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
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
        }
    };

    return (
        // ১. মেইন কন্টেইনারে আপনার ইমেজের মতো অফ-হোয়াইট/বেজ কালার ব্যবহার করা হয়েছে
        <div className="min-h-screen bg-[#F2EDE4] flex flex-col items-center justify-center p-4">
            
            {/* ২. হেডার টেক্সট সেকশন */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-medium text-[#1A1A1A] mb-4">
                    Sign in to your account
                </h1>
                <p className="text-lg text-[#1A1A1A]">
                    Or <a href="/register" className="underline font-semibold cursor-pointer">create a new account</a>
                </p>
            </div>

            {/* ৩. হোয়াইট কার্ড সেকশন */}
            <div className="w-full max-w-[550px] bg-white p-10 md:p-16 rounded-sm shadow-sm">
                
                <form onSubmit={handleLogin} className="space-y-8">
                    
                    {error && (
                        <p className="text-red-500 text-sm text-center font-medium">
                            {error}
                        </p>
                    )}

                    {/* Email Input Field */}
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

                    {/* Password Input Field */}
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

                    {/* Forgot Password Link */}
                    <div className="flex justify-end">
                        <a href="#" className="text-xs font-bold underline text-slate-900 uppercase tracking-tighter">
                            Forgot your password?
                        </a>
                    </div>

                    {/* ৪. সাইন ইন বাটন - পিওর ব্ল্যাক এবং শার্প কর্নার (ডিজাইন অনুযায়ী) */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-zinc-900 transition duration-300 mt-4"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;