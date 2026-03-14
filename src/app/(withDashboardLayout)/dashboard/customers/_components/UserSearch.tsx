"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

const UserSearch = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // ইউজার টাইপ করা থামালে ৩০০ms পর সার্চ হবে (Performance optimization)
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1"); // সার্চ করলে সব সময় প্রথম পেজ থেকে শুরু হবে
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
            </div>
            <input
    type="text"
    placeholder="Search email..." // এখানে ছোট হাতের করে দিতে পারেন
    onChange={(e) => handleSearch(e.target.value)}
    defaultValue={searchParams.get("query")?.toString()}
    // নিচের লাইনে 'uppercase' ক্লাসটি ডিলিট করে দিন
    className="w-full bg-[#FDFBF9] border border-[#EBE3D9] pl-12 pr-4 py-3 text-[10px] font-bold tracking-widest outline-none focus:border-black transition-all"
/>
        </div>
    );
};

export default UserSearch;