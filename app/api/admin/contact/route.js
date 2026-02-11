import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Contact from "@/models/Contact";

export async function GET() {
    try {
        await connectDB();

    const user = await getUserFromCookie();
    if(!user || user.role !== "ADMIN") return Response.json({error: "Unauthorized"}, {status: 401});

    const messages = await Contact.find().sort({createdAt: -1});
    if(!messages)return Response.json({error: "NO messages found!"}, {status: 404});

    return Response.json({success: true, messages});
    } catch (error) {
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}

export async function PATCH(req){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user || user.role !== "ADMIN") return Response.json({error: "Unauthorized"},{status: 401});

    const {id , isRead} = await req.json();
    
    if(!id || !isRead) return Response.json({error: "Invalid or message already read!"},{status: 400});

    await Contact.findByIdAndUpdate(id, {isRead});

    return Response.json({success: true});
}

