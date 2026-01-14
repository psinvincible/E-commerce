import nodemailer from "nodemailer";

export const sendEmail = async ({to, subject, html}) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

    } catch (error) {
        console.error("Email send error:", error);
        throw new Error("Email failed!");
    }
}