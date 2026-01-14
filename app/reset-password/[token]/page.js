"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const {token} = useParams();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/auth/reset-password/${token}`, {
                method: "POST",
                body: JSON.stringify({password}),
            });
            const data = await res.json();
            if(!res.ok){
                toast.error(data.error);
                setLoading(false);
                return;
            }
            toast.success("Password Updated.");
                router.push("/login");
                setLoading(false);
            
        } catch (error) {
            toast.error(error);
            return;
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-between bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>
            <input
          type="password"
          placeholder="New Password"
          className="border p-2 rounded w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          disabled={loading}
        />
        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
        </form>
        </div>
    )
    
}