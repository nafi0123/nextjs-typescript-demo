import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// --- GET: সব প্রোডাক্ট নিয়ে আসা ---
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }); // নতুনগুলো আগে দেখাবে
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- POST: নতুন প্রোডাক্ট ডাটাবেসে সেভ করা (আপনার Figma Form থেকে) ---
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // ডাটাবেসে নতুন প্রোডাক্ট তৈরি
    const product = await Product.create(body);
    
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}