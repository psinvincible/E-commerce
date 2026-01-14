"use client"

import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        
        try {
            const res = await fetch("/api/auth/forget-password",{
                method: "POST",
                body: JSON.stringify({email}),
            })
            const data = await res.json();
            if(!res.ok){
              toast.error(data.error);
              return;
            }
            toast.success("Password reset link sent to your mail.")
            setMessage(data.message);
            setLoading(false);
        } catch (error) {
            toast.error(error.error);
            return;
        }finally {
          setLoading(false);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-between bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Forget Password</h1>
        <input
          type="email"
          placeholder="Enter your email."
          className="border p-2 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          disabled={loading}
        />
        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
        {message && (
          <p className="text-sm text-center mt-4 text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}
