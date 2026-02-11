import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req){
    try {
        await connectDB();
        const { name, email, message} = await req.json();
        

        if(!name || !email || !message){
            return Response.json({error: "All fields are required!"}, {status: 400});
        }

        const query = await Contact.create({
            name, email, message,
        });
        return Response.json({success: true});
    } catch (error) {
        return Response.json({error: "Internal server error"},{status: 500});
    }
}