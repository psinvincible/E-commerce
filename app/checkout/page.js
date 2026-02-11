"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";
import BreadCrumbs from "@/components/BreadCrumbs";

export default function CheckOutPage() {
  const router = useRouter();
  const { fetchCount } = useCart();

  const [deliveryInfo, setDeilveryInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDeilveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    const { fullName, phone, address, city, state, pincode } = deliveryInfo;
    if (!fullName || !phone || !address || !city || !state || !pincode) {
      toast.error("All fields are required!");
      return;
    }
    if (fullName.trim().length < 3) {
      toast.error("Name must be greater than 3 letters");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Invalid mobile number!");
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Invalid Pincode!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: deliveryInfo,
          paymentMethod: "COD",
        }),
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

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch(`/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shippingInfo: deliveryInfo,
      }),
    });
    const data = await res.json();
    if(!data.ok){
      toast.error(data.error);
      return;
    }
    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 ">
      <div className="max-w-3xl mx-auto">
      <BreadCrumbs />
      
      <div className="mt-6 bg-white shadow-xl rounded-3xl p-8 ">
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        <p className="text-gray-500 mt-1 mb-8">Enter your shipping details below</p>

        <form onSubmit={placeOrder} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="fullName"
            type="text"
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            autoFocus
            />
            </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
          <input
            name="phone"
            type="tel"
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            type="text"
            rows={3}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              name="city"
              type="text"
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
              </div>

              <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              name="state"
              type="text"
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
              </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
          <input
            name="pincode"
            type="number"
            inputMode="numeric"
            placeholder="  Pincode"
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            </div>

            <div className="border-t pt-6 space-y-4 ">

              <button
            disabled={loading}
            className="w-full bg-black text-white cursor-pointer rounded-xl font-semibold py-3 hover:bg-gray-900 transition-all duration-200  disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order (COD)"}
          </button>

            {/* pay with stripe button */}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-green-600 text-white cursor-pointer rounded-xl py-3 font-semibold hover:bg-green-700 transition-all duration-200 disabled:opacity-50"
          >
            Pay Securely with Stripe
          </button>
            </div>
          
          
        </form>
      </div>
      </div> 
    </div>
  );
}
