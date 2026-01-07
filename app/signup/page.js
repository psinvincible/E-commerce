"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password, confirmPassword} = formData;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if(name.trim().length < 3){
      toast.error("Name must be greater than 3 letters");
      return;
    }
    if(password.length <= 5){
      toast.error("Password must be greater than 5 digits.");
      return;
    }
    if(password !== confirmPassword){
      toast.error("Password do not match!")
      return;
    }

    setLoading(true);
    try {
      const res = await
     fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

     const data = await res.json();

     if(!res.ok){
      throw new Error(data.error || "Signup failed!");
     }

     toast.success("Registration Successfull!"); 
     router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }finally {
      setLoading(false);
    }
  
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Hi, Welcome to E-Commerce
          </h1>
          <p className="text-sm text-gray-500">Signup to Continue Shopping</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-black transition"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-black transition"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black py-2.5 text-white font-medium hover:bg-gray-900 active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? "Registering in..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
