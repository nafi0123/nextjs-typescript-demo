"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// ১. এপিআই কি কনফিগারেশন
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

/**
 * ২. চ্যাট অ্যাসিস্ট্যান্ট (স্মার্ট ফিল্টারিং ও ব্যাকআপ লজিক সহ)
 */
export async function chatAssistant(userMessage: string, allProducts: any[]) {
  // ডাটা চেক
  if (!allProducts || !Array.isArray(allProducts) || allProducts.length === 0) {
    return "Our luxury catalog is currently being updated. How can I assist you otherwise?";
  }

  try {
    // ৩. মডেল নাম: 'gemini-pro' (সবচেয়ে স্থায়ী)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const catalogData = allProducts.map(p => ({
      name: p.name,
      price: p.price,
      category: p.category
    }));

    const prompt = `
      You are a luxury beauty shop assistant.
      Shop Catalog: ${JSON.stringify(catalogData)}
      User Message: "${userMessage}"
      Rules: Reply in max 2 short sentences. Be polite. Use information ONLY from the catalog.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text) return text;
    throw new Error("No response from AI");

  } catch (error: any) {
    /**
     * ৪. স্মার্ট ব্যাকআপ লজিক (AI ফেইল করলে এটি কাজ করবে)
     */
    console.log("AI not responding, using Smart Backup Logic...");

    const upperMsg = userMessage.toUpperCase();

    // ক) স্মার্ট বাজেট ফিল্টার (বাজেটের কাছের দামী প্রোডাক্ট আগে দেখাবে)
    const budgetMatch = userMessage.match(/\d+/);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[0]);
      
      const affordable = allProducts
        .filter(p => p.price <= budget) // বাজেট চেক
        .sort((a, b) => b.price - a.price) // দামী প্রোডাক্টগুলো আগে সাজানো (যাতে ৬০০ টাকার গুলো আগে আসে)
        .slice(0, 4) // সর্বোচ্চ ৪টি অপশন
        .map(p => `${p.name} (${p.price} TK)`)
        .join(", ");

      if (affordable) {
        return `Under your ${budget} TK budget, we highly recommend: ${affordable}. Would you like to see more details?`;
      }
    }

    // খ) ক্যাটাগরি ফিল্টার (SKINCARE, LIPSTICKS, FRAGRANCE)
    const categories = ["SKINCARE", "LIPSTICKS", "FRAGRANCE"];
    const foundCategory = categories.find(cat => upperMsg.includes(cat));

    if (foundCategory) {
      const catProducts = allProducts
        .filter(p => p.category === foundCategory)
        .sort((a, b) => b.price - a.price)
        .slice(0, 3)
        .map(p => `${p.name} (${p.price} TK)`)
        .join(", ");
        
      return `Our top ${foundCategory.toLowerCase()} selections include ${catProducts}. Would you like to explore them?`;
    }

    // গ) ডিফল্ট মেসেজ
    const productCount = allProducts.length;
    return `Welcome to Seoul Mirage. We have ${productCount} premium products. How can I guide your selection today?`;
  }
}

/**
 * ৫. প্রোডাক্ট ইনসাইট জেনারেটর
 */
export async function generateAIProductInsight(productName: string, category: string, description: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `Write a 10-word artistic luxury insight for ${productName}. Description: ${description}`
    );
    const response = await result.response;
    return response.text().trim();
  } catch (e) {
    return `Experience the timeless elegance of ${productName}, a signature of ${category}.`;
  }
}