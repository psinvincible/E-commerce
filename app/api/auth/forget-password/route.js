import { connectDB } from "@/lib/db";
import { sendEmail } from "@/lib/sendEmail";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req) {
    try {
        await connectDB();
        
        const { email } = await req.json();
        const user = await User.findOne({email});        
        if(!user){
            return Response.json({error: "Email not found!"},{status: 404});
        }
        const token = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = token;
        user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000; //10 min

        await user.save();

        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

        await sendEmail({
            to: user.email,
            subject: "Reset Your Password",
            html: `
                <p>You have requested a password reset.</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>This link will expire after 10minutes.</p>
            `,
        })
        return Response.json({message: "Reset Password Link Sent"})
    
    } catch (error) {
        return Response.json({error: "Something went wrong!"},{status: 500});
    }
    
}