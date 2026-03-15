"use server";

import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export const getAllProducts = async (
    page: number = 1, 
    limit: number = 10, 
    category: string = ""
) => {
    try {
        await connectDB();
        const skip = (page - 1) * limit;

        // ফিল্টার কুয়েরি
        const query = category && category !== "ALL" ? { category } : {};

        const products = await Product.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        return {
            products: JSON.parse(JSON.stringify(products)),
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            }
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [], pagination: null };
    }
};


export const addProduct = async (formData: any) => {
  try {
    await connectDB();

    await Product.create({
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image, // শুধু প্রয়োজনীয় ফিল্ড
      category: formData.category,
      description: formData.description,
    });

    revalidatePath("/dashboard/products");
    return { success: true, message: "Product Added!" };
  } catch (error: any) {
    return { success: false, message: "Failed to add product" };
  }
};


export const deleteProduct = async (id: string) => {
  try {
    await connectDB();
    
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return { success: false, message: "Product not found!" };
    }

    // ডিলিট হওয়ার পর ইনভেন্টরি পেজের ডাটা আপডেট করার জন্য
    revalidatePath("/dashboard/products"); 
    
    return { success: true, message: "Product deleted successfully!" };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }
};
