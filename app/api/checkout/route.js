import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Stripe from "stripe";

import Cart from "@/models/Cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req){
    try {
        await connectDB();

        const user = await getUserFromCookie();
        if(!user)return Response.json({error: "Login required!"},{status: 404});


        const cart = await Cart.findOne({userId: user.id}).populate("items.productId");
        if(!cart || cart.items.length === 0){
            return Response.json({error: "Cart is empty!"},{status: 400});
        }

        const { shippingInfo } = await req.json();
        const shippingAddress = shippingInfo;
        
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            images: item.productId.images,
        }));

        const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items : orderItems.map(item => ({
                price_data: {
                    currency: "inr",
                    product_data: {name: item.name},
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
            metadata: {
                userId: String(user.id),
                shippingAddress: JSON.stringify(shippingAddress),
                items: JSON.stringify(orderItems),
                totalAmount: String(totalAmount),
            }
        })

        return Response.json({ok: true, url: session.url})
    } catch (error) {
        console.error("[CHECKOUT ERROR]", error);
        return Response.json({error: error.message, stack: error.stack},{status: 500})
    }
}