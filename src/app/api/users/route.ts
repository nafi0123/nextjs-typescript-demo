import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; 
import User from "@/models/User"; 

export async function GET() {
    try {
        await connectDB(); 
        
        const users = await User.find({}).select("-password"); 

        return NextResponse.json(users);
    } catch (error: any) {
        console.error("API Error:", error.message);
        return NextResponse.json(
            { message: "Error fetching users", error: error.message }, 
            { status: 500 }
        );
    }
}