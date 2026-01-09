import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";
import Link from "next/link";

export default async function OrderPage({searchParams}) {
  await connectDB();

  const successFlag = await searchParams;
  const user = await getUserFromCookie();
  if (!user) {
    return Response.json(
      { error: "Please Login to Continue" },
      { status: 401 }
    );
  }

  const orders = await Order.find({ userId: user.id }).sort({ createdAt: -1 });

  if (!orders || orders.length === 0)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p>No orders found! Continue Shopping!!</p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        {successFlag?.sucess === "true" && (
            <div className="p-4 mb-6 rounded bg-green-100 text-green-800">🎉Your order has been placed successfully!</div>
        )}
      {orders.map((order) => (
        <div key={order._id} className="border mb-4 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Order Date: {new Date(order.createdAt).toLocaleDateString()}</span>
            <span className="text-sm text-gray-500">Last Update: {new Date(order.updateAt).toLocaleDateString()}</span>
            <span className={`px-3 py-1 text-sm rounded-full ${order.status === "PLACED" ? "bg-yello-100 text-yellow-700" : order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{order.status}</span>
            <p className="font-semibold mb-2">Total: ₹{order.totalAmount}</p>
            <div className="space-y-2">
                {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 border-t pt-2 ">
                        <img src={item.images} alt={item.image} className="h-14 w-14 rounded object-cover border" />
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-700">₹{item.price} x {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link href={`/orders/${order._id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
