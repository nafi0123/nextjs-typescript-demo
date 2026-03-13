"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ডাটা "তাজা" (Fresh) থাকবে, এই সময়ের মধ্যে পুনরায় API কল হবে না
        gcTime: 1000 * 60 * 30,    // ৩০ মিনিট পর অব্যবহৃত ডাটা মেমোরি থেকে মুছে যাবে (Garbage Collection)
        refetchOnWindowFocus: false, // ট্যাব পরিবর্তন করে ফিরে আসলে অটো রিফেচ হবে না
        retry: 1, // এরর খেলে একবার ট্রাই করবে
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}