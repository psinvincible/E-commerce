"use client"

import toast from "react-hot-toast"

export default function OrderCard({safeOrders}){

    const updateStatus = async(orderId, newStatus) => {
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({status: newStatus}),
            })
            console.log(newStatus);
            if(!res.ok) throw new Error("Update failed!")
            
            toast.success("Order status updated!");
        } catch {
            toast.error("Error occured!");
        }
    }
    return(
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
            {safeOrders.map((order) => (
                <div key={order._id} className="border rounded p-4 mb-4">
                    <p><strong>User: </strong>{order.userId.email}</p>
                    <p><strong>Total: </strong>₹{order.totalAmount}</p>
                    <p><strong>Status: </strong>{order.status}</p>
                        <select name="status" defaultValue={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="border p-2 mt-2" >
                            <option>PLACED</option>
                            <option>CONFIRMED</option>
                            <option>SHIPPED</option>
                            <option>DELIVERED</option>
                            <option>CANCELLED</option>
                        </select>
                </div>
            ))}

        </div>
        
    )
}