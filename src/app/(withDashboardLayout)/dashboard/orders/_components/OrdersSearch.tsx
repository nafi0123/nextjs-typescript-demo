"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const OrdersSearch = ({ defaultValue }: { defaultValue: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
            params.set("page", "1"); 
        } else {
            params.delete("search");
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <div className="relative w-full md:w-96">
            <input 
                type="text" 
                defaultValue={defaultValue}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search Transaction ID..." 
    className="w-full bg-[#FDFBF9] border border-[#EBE3D9] pl-12 pr-4 py-3 text-[10px] font-bold tracking-widest outline-none focus:border-black transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A38A6F]" size={18} />
            {isPending && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-pulse">
                    <div className="h-2 w-2 bg-black rounded-full"></div>
                </div>
            )}
        </div>
    );
};

export default OrdersSearch;