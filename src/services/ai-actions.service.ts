"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// ১. সঠিক এনভায়রনমেন্ট ভ্যারিয়েবল চেক
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function chatAssistant(userMessage: string, allProducts: any[]) {
  if (!allProducts || !Array.isArray(allProducts) || allProducts.length === 0) {
    return "Our premium catalog is currently being updated. How can I assist you otherwise?";
  }

  // ২. শুধুমাত্র প্রয়োজনীয় ডাটা পাঠানো (টোকেন সাশ্রয়ের জন্য)
  const catalogData = allProducts.map(p => ({
    name: p.name,
    price: p.price,
    category: p.category
  }));

  try {
    // ৩. মডেল নাম: 'gemini-1.5-flash' বর্তমানে সবথেকে স্ট্যাবল
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a luxury shop assistant.
      Catalog: ${JSON.stringify(catalogData)}
      User Question: "${userMessage}"
      Rules: Max 2 short sentences. Polite tone. Recommend products only from the catalog.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text) return text;
    throw new Error("Empty AI response");

  } catch (error: any) {
    console.error("AI Assistant Error:", error.status, error.message);

    /**
     * ৪. ব্যাকআপ লজিক (AI ফেইল করলে এটি কাজ করবে)
     * যদি ইউজার বাজেট নিয়ে প্রশ্ন করে (যেমন: "under 100")
     */
    const budgetMatch = userMessage.match(/\d+/);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[0]);
      const affordableProducts = allProducts
        .filter(p => p.price <= budget)
        .slice(0, 2) // সর্বোচ্চ ২টা সাজেস্ট করবে
        .map(p => `${p.name} (${p.price} TK)`)
        .join(", ");

      if (affordableProducts) {
        return `We have ${affordableProducts} available within your budget. Would you like to see them?`;
      }
    }

    // ডিফল্ট লাক্সারি রিপ্লাই
    return "Welcome to our luxury store. We have 13 premium products ready for you. How can I guide your selection today?";
  }
}

/**
 * ৫. প্রোডাক্ট ইনসাইট জেনারেটর
 */
export async function generateAIProductInsight(productName: string, category: string, description: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Create a 10-word artistic luxury insight for ${productName}. Description: ${description}`);
    const response = await result.response;
    return response.text().trim();
  } catch (e) {
    return `Discover the timeless elegance and premium essence of ${productName}.`;
  }
}