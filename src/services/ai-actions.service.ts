// actions/ai-actions.ts
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function generateAIProductInsight(productName: string, category: string, description: string) {
  try {
    // মডেল কনফিগারেশনে randomness বাড়ানোর জন্য temperature যোগ করা হয়েছে
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { temperature: 0.8 } 
    });

    const prompt = `
      You are a high-end luxury brand storyteller. 
      Product Name: ${productName}
      Category: ${category}
      Description: ${description}

      Task: Write a unique, 10-word artistic insight about this product. 
      Do NOT mention the word "collection" or "must-have". 
      Focus on the ${category} vibe and the specific name ${productName}.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return `A signature ${category.toLowerCase()} that defines the essence of ${productName}.`;
  }
}