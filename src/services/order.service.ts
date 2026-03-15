"use server";

import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function getAllOrders(page = 1, limit = 8, searchTerm = "") {
    try {
        await dbConnect();
        const skip = (page - 1) * limit;

        // Transaction ID দিয়ে সার্চ করার কুয়েরি
        const query = searchTerm 
            ? { transactionId: { $regex: searchTerm, $options: "i" } } 
            : {};

        const totalOrders = await Order.countDocuments(query);
        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(orders)),
            pagination: {
                totalOrders,
                totalPages: Math.ceil(totalOrders / limit),
                currentPage: page,
                hasNextPage: skip + orders.length < totalOrders,
                hasPrevPage: page > 1,
            }
        };
    } catch (error) {
        return { success: false, data: [], pagination: null };
    }
}