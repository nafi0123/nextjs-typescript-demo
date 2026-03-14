import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, uppercase: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true }, // আপনি 'image' নামে ব্যবহার করতে চাইলে এটাই রাখুন
    category: { 
      type: String, 
      required: true,
      enum: ["SKINCARE", "LIPSTICKS", "FRAGRANCE"] 
    },
    description: { type: String, required: true, uppercase: true },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;