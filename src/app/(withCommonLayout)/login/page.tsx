"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

// আপনার লোকাল লোগো ইম্পোর্ট (পাথ চেক করে নিবেন)
import Logo from "@/assets/img/logo.png";

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
                redirect: false, // আমরা নিজেরাই রিডাইরেক্ট করব
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
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl">
                
                {/* 1. Figma Logo - centered */}
                <div className="flex justify-center mb-8">
                    <Image 
                        src={Logo} 
                        alt="Seoul Mirage Logo" 
                        width={150} // Figma অনুযায়ী সাইজ দিবেন
                        height={40} 
                        priority 
                    />
                </div>

                {/* 2. Welcome Back text - centered */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
                    <p className="text-slate-500">Please enter your credentials to continue</p>
                </div>

                {/* 3. Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    
                    {error && (
                        <p className="text-red-500 bg-red-50 text-sm p-3 rounded-md text-center">
                            {error}
                        </p>
                    )}

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-400"
                        />
                        {/* Eye Icon for Show/Hide Password */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    {/* Remember me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        
                        <a href="#" className="text-slate-600 hover:text-slate-900">Forgot password?</a>
                    </div>

                    {/* 4. Sign In Button - Figma Style (Black) */}
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                {/* Optional: Add a link to Register page */}
                <div className="text-center mt-6 text-slate-600 text-sm">
                    Don't have an account? {" "}
                    <a href="/register" className="text-slate-900 font-medium hover:underline">
                        Register
                    </a>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;