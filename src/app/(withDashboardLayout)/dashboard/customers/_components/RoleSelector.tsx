"use client";

import React, { useTransition } from 'react';
import { updateUserRole } from '@/services/coustomers.service'; // আপনার সার্ভিস ফাইল পাথ অনুযায়ী
import { toast } from 'react-hot-toast'; // অথবা অন্য কোনো নোটিফিকেশন লাইব্রেরি

const RoleSelector = ({ userId, currentRole }: { userId: string, currentRole: string }) => {
    const [isPending, startTransition] = useTransition();

    const handleChange = (newRole: string) => {
        startTransition(async () => {
            const res = await updateUserRole(userId, newRole);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    return (
        <select
            disabled={isPending}
            defaultValue={currentRole}
            onChange={(e) => handleChange(e.target.value)}
            className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border border-[#EBE3D9] cursor-pointer outline-none transition-all ${
                isPending ? 'opacity-50' : 'hover:bg-slate-50'
            } ${currentRole === 'admin' ? 'bg-black text-white' : 'bg-[#F2EDE4] text-[#A38A6F]'}`}
        >
            <option value="customer">User</option>
            <option value="admin">Admin</option>
            
        </select>
    );
};

export default RoleSelector;