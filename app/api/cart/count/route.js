import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Cart from "@/models/Cart";

export async function GET() {
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return Response.json({count: 0});
    }
    const cart = await Cart.findOne({userId: user.id});
    if(!cart){
        return Response.json({count: 0});
    }

    const count = cart ? cart.items.reduce((sum, i) => sum + i.quantity, 0) : 0;

    return Response.json({count});

}