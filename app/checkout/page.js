"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckOutPage() {
  const router = useRouter();
  const { fetchCount } = useCart();

  const [deliveryInfo, setDeilveryInfo] = useState({
    fullName: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDeilveryInfo({...deliveryInfo, [e.target.name]: e.target.value})
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    const { fullName, phone, address, city, state, pincode } = deliveryInfo;
    if(!fullName || !phone || !address || !city || !state || !pincode){
      toast.error("All fields are required!");
      return;
    }
    if(fullName.trim().length < 3 ){
      toast.error("Name must be greater than 3 letters")
      return;
    }
    if(!/^\d{10}$/.test(phone)){
      toast.error("Invalid mobile number!");
      return;
    }
    if(!/^\d{6}$/.test(pincode)){
      toast.error("Invalid Pincode!");
      return;
    }   

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          shippingAddress: deliveryInfo,
          paymentMethod: "COD",
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      await fetchCount();
      toast.success("Order Placed Successfully");
      router.push("/orders?success=true");
    } catch (error) {
      toast.error("Please Login to Order");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-1">Checkout</h1>
      <p className="text-sm tex-gra-500 mb-6">Enter your shipping Address</p>
      <form onSubmit={placeOrder} className="space-y-4">
        <input name="fullName" type="text" placeholder="  Full Name" onChange={handleChange} disabled={loading} className="w-full bg-gray-200 rounded input" autoFocus/>
        <input name="phone" type="tel" placeholder="  Contact No." onChange={handleChange} disabled={loading} className="w-full bg-gray-200 rounded input" />
        <textarea name="address" type="text" rows={3} placeholder="  Address" onChange={handleChange} disabled={loading} className="w-full bg-gray-200 rounded input" />
        <div className="grid grid-cols-2 gap-3">
        <input name="city" type="text" placeholder="  City" onChange={handleChange} disabled={loading} className="bg-gray-200 rounded input" />
        <input name="state" type="text" placeholder="  State" onChange={handleChange} disabled={loading} className="bg-gray-200 rounded input" />
        </div>
        <input name="pincode" type="number" inputMode="numeric" placeholder="  Pincode" onChange={handleChange} disabled={loading} className="w-full bg-gray-200 rounded input" />
      <button
        disabled={loading}
        className="w-full bg-black text-white cursor-pointer rounded-xl py-3 font-medium hover:bg-gray-900 transition disabled:opacity-50"
        >
        {loading ? "Placing Order..." : "Place Order (COD)"}
      </button>
        </form>
    </div>
    </div>
  );
}
