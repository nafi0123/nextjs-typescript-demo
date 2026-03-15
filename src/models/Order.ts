// src/models/Order.ts
import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    transactionId: { type: String, required: true },
    userEmail: { type: String, required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["PENDING", "PAID", "FAILED", "CANCELLED"], 
      default: "PENDING" 
    },
    shippingAddress: { type: Object, required: true },
    // এই ফিল্ডটি নিশ্চিত করুন
    paymentMethod: { type: String, default: "N/A" }, 
  },
  { timestamps: true, strict: false } // 'strict: false' দিলে স্কিমার বাইরের ডাটাও সেভ হতে দেয়
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;