import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";
import Cart from "@/models/Cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await connectDB();

    const user = await getUserFromCookie();
    if (!user)
      return Response.json({ error: "Login required" }, { status: 401 });

    //for emptying cart
    const cart = await Cart.findOne({userId: user.id}).populate("items.productId");

    
    const { sessionId: reqSessionId } = await req.json();
    const session = await stripe.checkout.sessions.retrieve(reqSessionId);

    if (session.payment_status !== "paid") {
      return Response.json({ success: false });
    }

    // Extracting order data from Stripe session metadata
    const metadata = session.metadata || {};
    const orderItems = metadata.items ? JSON.parse(metadata.items) : [];
    const shippingAddress = metadata.shippingAddress ? JSON.parse(metadata.shippingAddress) : {};
    const totalAmount = metadata.totalAmount ? Number(metadata.totalAmount) : 0;
    const userId = metadata.userId;

    const stripeSessionId = session.id;
    // this will prevent  duplicate order creation for the same Stripe session
    let order = await Order.findOne({ "metadata.sessionId": stripeSessionId });
    if (!order) {
      order = await Order.create({
        userId,
        items: orderItems,
        shippingAddress,
        paymentMethod: "ONLINE",
        paymentStatus: "PAID",
        totalAmount,
        metadata: { sessionId: stripeSessionId },
      });
      //cleared the cart
      cart.items = [];
      await cart.save();
    }
    
    
  
    return Response.json({ success: true, orderId: order._id });
  } catch (error) {
    console.error("[STRIPE VERIFY ERROR]", error);
    return Response.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
  }
}
