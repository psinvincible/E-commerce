import { sendEmail } from "@/lib/sendEmail";

export async function GET() {
    await sendEmail({
        to: "dup9343@gmail.com",
        subject: "Test Email",
        html: "<h1>Success!! Email sent via nodemailer, working</h1>",
    })
    return Response.json({success: true});
}