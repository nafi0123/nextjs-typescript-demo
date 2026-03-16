import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// --- ২. Public Axios (সবার জন্য উন্মুক্ত কাজের জন্য) ---
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- ৩. Private Axios (টোকেনসহ সুরক্ষিত কাজের জন্য) ---
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // এটি খুবই জরুরি যাতে লাইভ সার্ভারে সেশন কুকি ঠিকমতো কাজ করে
});

/**
 * ৪. ইন্টারসেপ্টর কনফিগারেশন:
 * রিকোয়েস্ট পাঠানোর আগে বা রেসপন্স পাওয়ার পর কোনো কাজ করতে চাইলে এখানে করতে পারেন।
 */
axiosPrivate.interceptors.request.use(
  (config) => {
    // আপনি যদি লোকাল স্টোরেজে কোনো টোকেন রাখেন তবে এখানে অ্যাড করতে পারেন
    // const token = localStorage.getItem("access-token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// রেসপন্স ইন্টারসেপ্টর (টোকেন এক্সপায়ার হলে হ্যান্ডেল করার জন্য)
axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // এখানে লগআউট লজিক বা রিফ্রেশ টোকেন লজিক দেওয়া যায়
    }
    return Promise.reject(error);
  }
);

export default axiosPublic;