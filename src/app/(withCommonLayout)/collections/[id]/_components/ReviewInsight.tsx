// components/ReviewInsight.tsx
"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { generateAIProductInsight } from "@/services/ai-actions.service";

export default function ReviewInsight({ product }: { product: any }) {
  const [summary, setSummary] = useState<string>("AI is analyzing this item...");

  useEffect(() => {
    const fetchInsight = async () => {
      // আপনার ডেটার ফিল্ডগুলো (name, category, description) পাঠানো হচ্ছে
      const res = await generateAIProductInsight(
        product.name, 
        product.category, 
        product.description
      );
      setSummary(res);
    };

    if (product) {
      fetchInsight();
    }
  }, [product]);

  return (
    <div className="bg-[#FBF9F6] border border-slate-200 p-5 my-8 rounded-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-black p-1">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Smart AI Insight
        </h4>
      </div>
      <p className="text-slate-800 font-medium italic leading-relaxed border-l-2 border-black/10 pl-4 text-sm md:text-base">
        "{summary}"
      </p>
    </div>
  );
}