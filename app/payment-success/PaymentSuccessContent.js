"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


export default function PaymentSuccessContent() {
    const [status, setStatus] = useState("verifying");
    const [orderId, setOrderId] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        if (!sessionId) {
            setStatus("error");
            return;
        }
        let called = false;
        if (!called) {
            called = true;
            fetch("/api/stripe/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId }),
            })
                .then(async (res) => {
                    const data = await res.json();
                    if (data.success) {
                        setStatus("success");
                        setOrderId(data.orderId);
                        setTimeout(() => {
                            router.push("/orders");
                        }, 3000);
                    } else {
                        setStatus("error");
                    }
                })
                .catch(() => setStatus("error"));
        }
    }, [searchParams, router]);

    if (status === "verifying") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-gray-700">Verifying payment...</h1>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold text-green-600">Payment Success</h1>
                <p className="mt-4">Thank You! Your order has been placed.</p>
                <p className="mt-2 text-blue-500">Redirecting to your orders in 3 seconds...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
            <p className="mt-4">Sorry, we could not verify your payment or create your order.</p>
            <button onClick={() => router.push("/")} className="mt-4 px-4 py-2 bg-black text-white rounded">Go Home</button>
        </div>
    );
}