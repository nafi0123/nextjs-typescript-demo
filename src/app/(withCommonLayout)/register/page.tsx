"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

// আপনার লোকাল লোগো ইম্পোর্ট (পাথ চেক করে নিবেন)
import Logo from "@/assets/img/logo.png";

const RegisterPage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                // সফলভাবে রেজিস্ট্রেশন হলে লগইন পেজে পাঠিয়ে দিবে
                router.push("/login");
            } else {
                const data = await res.json();
                setError(data.message || "Registration failed!");
            }
        } catch (err) {
            setError("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl">
                
                {/* Figma Logo - centered */}
                <div className="flex justify-center mb-8">
                    <Image 
                        src={Logo} 
                        alt="Seoul Mirage Logo" 
                        width={150} 
                        height={40} 
                        priority 
                    />
                </div>

                {/* Text - centered */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
                    <p className="text-slate-500">Enter your details to register</p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleRegister} className="space-y-6">
                    
                    {error && (
                        <p className="text-red-500 bg-red-50 text-sm p-3 rounded-md text-center">
                            {error}
                        </p>
                    )}

                    {/* Name Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

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
                            placeholder="Create a Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition outline-none text-slate-900 placeholder:text-slate-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    {/* Register Button - Figma Style (Black) */}
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition duration-200"
                    >
                        Register
                    </button>
                </form>

                {/* Link to Login */}
                <div className="text-center mt-6 text-slate-600 text-sm">
                    Already have an account? {" "}
                    <a href="/login" className="text-slate-900 font-medium hover:underline">
                        Sign In
                    </a>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;