"use server";

import connectDB from "@/lib/db";
import ProductModel from "@/models/Product";
import { unstable_cache } from "next/cache";

export const getAllCollections = unstable_cache(
  async (page: number = 1, limit: number = 8) => {
    try {
      await connectDB();

      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        ProductModel.find({}, "name price image")
          .skip(skip)
          .limit(limit)
          .lean(),

        ProductModel.estimatedDocumentCount(),
      ]);

      return {
        products,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error("Collection Fetch Error:", error);
      return { products: [], totalPages: 0, currentPage: 1 };
    }
  },
  ["collections"], // cache key
  {
    revalidate: 60, // 🔥 60 sec por refresh
  }
);