import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";

export async function PUT(req, {params}){
    await connectDB();

    const user = await getUserFromCookie();

    if(!user || user.role !== "ADMIN"){
        return Response.json({error: "Admin Privilage Required!"},{status: 401});
    }

    const {id} = await params;
    const {action} = await req.json();

    const order = await Order.findById(id);
    if(!order){
        return Response.json({error: "Order not found!"},{status: 404});
    }

    if(action === "APPROVE"){
        order.status = "CANCELLED";
        order.updatedAt = Date.now();
    }else {
        order.cancelReason = "Order cannot be cancelled!";
        order.updatedAt = Date.now();
    }

    await order.save();

    return Response.json({message: "Updated"});

}