import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";

export async function PUT(req, {params}){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return Response.json({error: "Login Required!"},{status: 401});
    }

    const {id} = await params;
    const {reason} = await req.json();
    console.log(id, reason);
    
    const order = await Order.findById(id);
    if(!order){
        return Response.json({error: "Order not found!"},{status: 404});
    }

    if(order.userId.toString() !== user.id.toString()){
        return Response.json({error: "Unauthorized!"},{status: 403});
    }

    if(['DELIVERED', 'CANCELLED'].includes(order.status)){
        return Response.json({error: "Order cannot be cancelled!"},{status: 400});
    }

    order.status = "CANCELLATION_REQUESTED";
    order.cancelReason = reason;
    await order.save();

    return Response.json({message: "Cancellation Requested"});
}