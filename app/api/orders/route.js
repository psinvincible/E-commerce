import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Cart from "@/models/Cart";
import Order from "@/models/Order";

export async function POST(req) {
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return Response.json({error: "Please Login to Continue"},{status: 401});
    }
    const {shippingAddress, paymentMethod} = await req.json();
    const cart = await Cart.findOne({userId: user.id}).populate("items.productId");
    if(!cart || cart.items.length === 0 ){
        return Response.json({error: "Cart is empty!"},{status: 400});
    }

    let total = 0;

    const orderItems = cart.items.map((item) => {
        total += item.quantity * item.productId.price;

        return {
            productId: item.productId,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            images: item.productId.images,
        }
    })
    const order = await Order.create({
        userId: user.id,
        items: orderItems,
        totalAmount: total,
        shippingAddress,
        paymentMethod,
    });

    cart.items = [];
    await cart.save();
    
    return Response.json(order, {status: 201});
}