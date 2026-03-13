"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import useAxiosPublic from '@/hooks/useAxiosPublic';

const RegisterPage = () => {
    const axiosPublic = useAxiosPublic();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // ডিজাইনে এটি আছে
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError("Passwords do not match!");
        }

        setIsLoading(true);

        try {
            const res = await axiosPublic.post("/register", {
                name,
                email,
                password
            });

            if (res.status === 201 || res.status === 200) {
                router.push("/login");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Something went wrong!";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // ১. মেইন ব্যাকগ্রাউন্ড কালার আপনার ইমেজের সাথে মিল রেখে
        <div className="min-h-screen bg-[#F2EDE4] flex flex-col items-center justify-center p-4">
            
            {/* ২. হেডার টেক্সট সেকশন */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-medium text-[#1A1A1A] mb-4">
                    Create your account
                </h1>
                <p className="text-lg text-[#1A1A1A]">
                    Or <a href="/login" className="underline font-semibold cursor-pointer">sign in to your existing account</a>
                </p>
            </div>

            {/* ৩. হোয়াইট কার্ড সেকশন */}
            <div className="w-full max-w-[550px] bg-white p-10 md:p-16 rounded-sm shadow-sm">
                
                <form onSubmit={handleRegister} className="space-y-7">
                    
                    {error && (
                        <p className="text-red-500 text-sm text-center font-medium">
                            {error}
                        </p>
                    )}

                    {/* Full Name Input */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-4 border border-slate-200 rounded-md focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-300"
                            placeholder="Your full name"
                        />
                    </div>

                    {/* Email Address Input */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-4 border border-slate-200 rounded-md focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-300"
                            placeholder="Your email address"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
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
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input (ডিজাইন অনুযায়ী যোগ করা হয়েছে) */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-4 border border-slate-200 rounded-md focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-300"
                            placeholder="Confirm your password"
                        />
                    </div>

                    

                    {/* ৪. ক্রিয়েট অ্যাকাউন্ট বাটন - শার্প কর্নার ও পিওর ব্ল্যাক */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-zinc-900 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-80"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;