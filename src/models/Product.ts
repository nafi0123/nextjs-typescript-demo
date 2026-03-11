import mongoose, { Schema, model, models } from "mongoose";

// 1. Schema Definition
const ProductSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, "Product name is required"], 
      trim: true 
    },
    category: { 
      type: String, 
      required: [true, "Category is required"] 
    },
    price: { 
      type: Number, 
      required: [true, "Price is required"],
      min: 0 
    },
    costPrice: { 
      type: Number, 
      required: [true, "Cost price is required"],
      min: 0 
    },
    stockQuantity: { 
      type: Number, 
      required: [true, "Stock quantity is required"],
      default: 0 
    },
    description: { 
      type: String, 
      trim: true 
    },
    tags: [
      { 
        type: String 
      }
    ],
    vendor: { 
      type: String, 
      required: [true, "Vendor name is required"],
      trim: true 
    },
    thumbnail: { 
      type: String, 
      required: [true, "Product image is required"] 
    },
  },
  { 
    // Auto creates createdAt and updatedAt fields
    timestamps: true 
  }
);

// 2. Model Export
// Next.js refresh-er somoy jeno bar bar model create na hoy tai models.Product check kora hoy
const Product = models.Product || model("Product", ProductSchema);

export default Product;