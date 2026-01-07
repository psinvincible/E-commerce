import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";

export async function GET() {
    await connectDB();

    const user = await getUserFromCookie();
    if(!user || user.role !== "ADMIN"){
        return Response.json({error: 'Admin privilage is required'},{status: 401});
    }

    const orders = await Order.find({}).populated({userId, email}).sort({createdAt: -1});
    
    return Response.json(orders);
}