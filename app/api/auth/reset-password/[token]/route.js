import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";


export async function POST(req, {params}) {
    try {
        await connectDB();
        const {password} = await req.json();
        const {token} = await params;

        

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: {$gt: Date.now()},
        });
        if(!user){
            return Response.json({error: "Invalid or token expired!"},{status: 400});
        }
        user.password = await bcrypt.hash(password, 16);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        return Response.json({message: "Password Updated!"});
    } catch (error) {
        return Response.json({error: "Failed to reset password!"},{status: 500});
    }
    
}