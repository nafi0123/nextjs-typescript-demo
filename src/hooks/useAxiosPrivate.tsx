"use client";

import { axiosPrivate } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxiosPrivate = () => {
    const { data: session } = useSession();

    useEffect(() => {
        // রিকোয়েস্ট ইন্টারসেপ্টর: ডাটা পাঠানোর আগে টোকেন অ্যাড করবে
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"] && session?.user) {
                    // যদি আপনার API টোকেন চায়, তবে এখানে দিতে পারেন
                    // আপাতত আমরা উদাহরন হিসেবে Bearer টোকেন দেখাচ্ছি
                    // config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // রেসপন্স ইন্টারসেপ্টর: এরর হ্যান্ডলিং (যেমন টোকেন এক্সপায়ার হলে)
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 403 || error.response?.status === 401) {
                    // এখানে আপনি ইউজারকে লগআউট করাতে পারেন বা টোকেন রিফ্রেশ করতে পারেন
                }
                return Promise.reject(error);
            }
        );

        // ক্লিনআপ ফাংশন
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [session]);

    return axiosPrivate;
};

export default useAxiosPrivate;