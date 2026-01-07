import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";

export default async function OrderDetaislPage({params}){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return (
            <p>Please login to see Order Details Page!!</p>
        )
    }
    const {id} = await params;
    const order = await Order.findOne({
        _id: id,
        userId: user.id,
    }).lean();

    if(!order){
        return <p>Order not found!</p>
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>

            <div className="mb-4">
                <span className="font-semibold">Status:</span>{" "}
                <span className="px-3 py-1 bg-gray-200 rounded">{order.status}</span>
            </div>

            <div className="border p-4 rounded mb-6">
                <h2 className="font-bold mb-2">Shipping Address</h2>
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} - {" "}
                    {order.shippingAddress.pincode}
                </p>
                <p>📞 {order.shippingAddress.phone}</p>
            </div>

            <div className="border p-4 rounded mb-6">
                <h2 className="font-bold mb-2">Items</h2>
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between border-b py-2">
                        <div>
                            <p  className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p>₹{item.price * item.quantity}</p>
                    </div>
                ))}
            </div>

            <div className="border p-4 rounded">
                <p><strong>Payment: </strong>{order.paymentMethod}</p>
                <p><strong>Total Amount: </strong>₹{order.totalAmount}</p>
            </div>
        </div>
    )

}