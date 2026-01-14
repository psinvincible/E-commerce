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
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600">No orders found.{""}
          <Link href="/products" className="text-blue-600 underline">Continue Shopping</Link> </p>
      </div>
    );

    const statusStyle = (status)=> {
      switch (status) {
        case "PLACED":
          return "bg-yellow-100 text-yellow-700";        
        case "SHIPPED":
          return "bg-blue-100 text-blue-700";
        case "DELIVERED":
          return "bg-green-100 text-green-700";
        case "CANCELLED":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        {successFlag?.sucess === "true" && (
            <div className="p-4 mb-6 rounded bg-green-100 text-green-800">🎉Your order has been placed successfully!</div>
        )}
      
      <div className="space-y-6">
      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg shadow-sm bg-white p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <div className="text-sm text-gray-500">
            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Last Update: {new Date(order.updatedAt).toLocaleDateString()}</p>
            </div>

            <span className={`px-3 py-1 text-sm rounded-full font-medium w-fit ${statusStyle(order.status)}`}>{order.status}</span>

            <div className="border-t space-y-3 pt-4">
                {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 ">
                        <img src={item.images} alt={item.image} className="h-16 w-16 rounded object-cover border" />
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">₹{item.price} x {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4 border-t pt-4">
            <p className="font-semibold text-lg">Total: ₹{order.totalAmount}</p>
            </div>

            <Link href={`/orders/${order._id}`} className="inline-block text-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">View Details</Link>
            
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
