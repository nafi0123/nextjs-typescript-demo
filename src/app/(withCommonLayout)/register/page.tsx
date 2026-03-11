"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import useAxiosPublic from '@/hooks/useAxiosPublic'; // আপনার হুক ইম্পোর্ট করুন

import Logo from "@/assets/img/logo.png";

const RegisterPage = () => {
    const axiosPublic = useAxiosPublic(); // হুক কল করা হলো
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // হুক থেকে আসা axiosPublic ব্যবহার করে POST রিকোয়েস্ট
            const res = await axiosPublic.post("/register", {
                name,
                email,
                password
            });

            if (res.status === 201 || res.status === 200) {
                // সাকসেস হলে লগইন পেজে রিডাইরেক্ট
                router.push("/login");
            }
        } catch (err: any) {
            // Axios এরর হ্যান্ডলিং
            const errorMessage = err.response?.data?.message || "Something went wrong! Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl">
                
                {/* Figma Logo */}
                <div className="flex justify-center mb-8">
                    <Image 
                        src={Logo} 
                        alt="Seoul Mirage Logo" 
                        width={150} 
                        height={40} 
                        priority 
                    />
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
                    <p className="text-slate-500">Join us to get the best skincare experience</p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-6">
                    
                    {error && (
                        <div className="text-red-500 bg-red-50 text-sm p-3 rounded-lg text-center border border-red-100 animate-in fade-in duration-300">
                            {error}
                        </div>
                    )}

                    {/* Name Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition outline-none text-slate-900"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition outline-none text-slate-900"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition outline-none text-slate-900"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5" />
                                Processing...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                <div className="text-center mt-6 text-slate-600 text-sm">
                    Already have an account? {" "}
                    <a href="/login" className="text-slate-900 font-bold hover:underline">
                        Sign In
                    </a>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;