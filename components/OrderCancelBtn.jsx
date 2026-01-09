"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OrderCancelBtn({order, orderId}){
    const router = useRouter();
    const [reason, setReason] = useState("");

    const requestCancel = async()=> {
        try {
            const res = await fetch(`/api/orders/${orderId}/cancel`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({reason})
            });
            const data = await res.json();
            if(!res.ok){
                toast.error("Failed to request cancellation!");
                return;
            }

            toast.success("Cancellation Requested");
            router.refresh();
        } catch (error) {
            toast.error("error:", error);
        }
    }
    return (
        <div className="border p-4 rounded border-gray-600">
                {order.status !== "DELIVERED" && order.status !== "CANCELLED" && order.status !== "CANCELLATION_REQUESTED" && (
                    <div className="mt-4">
                        <textarea
                            className="border p-2 w-full rounded"
                            placeholder="Reason for cancellation?"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        ></textarea>
                        <button onClick={requestCancel} className="bg-red-600 text-white mt-2 px-4 py-2 rounded">Request Cancellation</button>
                    </div>
                )}

            </div>
    )
}