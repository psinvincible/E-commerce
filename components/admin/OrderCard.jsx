"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BreadCrumbs from "../BreadCrumbs";

export default function OrderCard({ safeOrders }) {
    const router = useRouter();

    const updateCancel = async (orderId, action)=> {
        try {
            const res = await fetch(`/api/admin/orders/${orderId}/cancel`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({action})
            })
            if(!res.ok){
                toast.error("Failed to update request!");
                return;
            }
            const data = await res.json();
            toast.success("Request Updated");
            router.refresh();
        } catch (error) {
            toast.error(data.error || "Something went wrong!");
            return;
        }
    }
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) throw new Error("Update failed!");

      toast.success("Order status updated!");
    } catch {
      toast.error("Error occured!");
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <BreadCrumbs />
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      {safeOrders.map((order) => (
        <div key={order._id}>
          <div  className="border rounded p-4 mb-4">
            <p>
              <strong>User: </strong>
              {order.userId.email}
            </p>
            <p>
              <strong>Total: </strong>₹{order.totalAmount}
            </p>
            <p>
              <strong>Status: </strong>
              {order.status}
            </p>
            <select
              name="status"
              defaultValue={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="border p-2 mt-2"
            >
              <option>PLACED</option>
              <option>CONFIRMED</option>
              <option>SHIPPED</option>
              <option>DELIVERED</option>
              <option>CANCELLED</option>
            </select>
          {order.status === "CANCELLATION_REQUESTED" && (
            <p className="text-red-600 font-medium">Cancellation Request</p>
          )}
          {order.cancelReason && (
            <p className="text-red-600 font-medium">{order.cancelReason}</p>
          )}
          {order.status === "CANCELLATION_REQUESTED" && (
            <div className="flex gap-2 mt-2 ">
                <button onClick={() => updateCancel(order._id, "APPROVE")} className="bg-red-600 text-white px-3 py-1 rounded">Approve</button>
                <button onClick={() => updateCancel(order._id, "REJECT")} className="bg-gray-600 text-white px-3 py-1 rounded">Rejected</button>
            </div>
          )}
          </div>
        </div>
      ))}
    </div>
  );
}
