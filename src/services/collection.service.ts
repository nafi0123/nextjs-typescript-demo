"use server";
import connectDB from "@/lib/db";
import ProductModel from "@/models/Product";

export const getAllCollections = async (page: number = 1, limit: number = 8) => {
    try {
        await connectDB();
        const skip = (page - 1) * limit;

        // ডাটা এবং টোটাল কাউন্ট এক সাথে আনা
        const [products, total] = await Promise.all([
            ProductModel.find().skip(skip).limit(limit).lean(),
            ProductModel.countDocuments()
        ]);

        return {
            products: JSON.parse(JSON.stringify(products)),
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    } catch (error) {
        console.error("Collection Fetch Error:", error);
        return { products: [], totalPages: 0, currentPage: 1 };
    }
};