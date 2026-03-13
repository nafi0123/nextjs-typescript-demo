"use client";

import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const CustomersPage = () => {
    const secureAxios = useAxiosPrivate();

    // TanStack Query ব্যবহার করে ইউজার ডাটা ফেচিং
    const { data: users = [], isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await secureAxios.get('/users'); // আপনার API এন্ডপয়েন্ট অনুযায়ী পাথটি পরিবর্তন করুন (যেমন: /users বা /all-users)
            return res.data;
        }
    });



    return (
        <div className="bg-white p-8 rounded-sm shadow-sm border border-[#EBE3D9]">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tighter">Customers List</h1>
                <p className="text-slate-500 text-sm mt-2">Manage and view all registered users here.</p>
            </div>

            {/* ডাটা লোডিং বা এরর মেসেজ UI */}
            {isLoading ? (
                <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : isError ? (
                <div className="text-red-500 p-4 bg-red-50 rounded-sm">
                    Failed to load users. Please check console for details.
                </div>
            ) : (
                <div className="border-2 border-dashed border-[#EBE3D9] h-64 flex items-center justify-center text-slate-400">
                    {users.length} Users found. Check the browser console for the full data.
                </div>
            )}
        </div>
    );
};

export default CustomersPage;