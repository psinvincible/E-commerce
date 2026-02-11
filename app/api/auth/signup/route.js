import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await connectDB();

    try {
       const { name, email, password} = await req.json();
       console.log(name,email,password)
    if(!name || !email || !password){
        return Response.json({error: "All fields are required!"},{status: 400});
    }
    if(name.trim().length < 3){
        return Response.json({error: "Name must be greater than 3 letters"},{status: 409});
    }
    if(password.length <= 5){
        return Response.json({error: "Password must be at least 5 digits"},{status: 409});
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
        return Response.json({error: "Email already exists!"},{status: 409});
    };

    const hashedPassword = await bcrypt.hash(password, 16);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    console.log("User created successful", user)
    
    return Response.json({message: "Signup successfull."},{status: 201})
    } catch (error) {
        return Response.json({error: "Something went wrong!"},{status: 500})
    }
}