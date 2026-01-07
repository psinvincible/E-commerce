import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const { email, password} = await req.json();

    const user = await User.findOne({email});
    if(!user) {
        return Response.json({error: "Incorrect email or password"});
    };

    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword) {
        return Response.json({error: "Incorrect email or password"});
    };

    const token = generateToken(user);

    const response = NextResponse.json({
        message: "Login Successful",
    })

    response.cookies.set("token", token, {
        httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",      
    secure: process.env.NODE_ENV === "production"
    })
    
    return response;
    
}


