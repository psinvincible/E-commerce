"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";


export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const { count } = useCart();

  if (loading) return null;

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link href="/" className="font-bold text-xl">
        E-Commerce
      </Link>
      {user?.role === "ADMIN" && <span className="animate-pulse bg-gray-400 rounded-full p-2 font-bold text-white">Admin Panel</span>}      

      <div className="flex gap-4 items-center">
        <Link href="/cart" className="relative">
          Cart 
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">{count}</span>
        </Link>
        {user && <Link href="/orders" className="hover:underline">My Orders</Link>}
        {!user && <Link href="/login" className="bg-cyan-300 rounded p-2 hover:bg-cyan-200">Login</Link>}
        {user?.role === "USER" && <Link href="/profile">Profile</Link>}
        {user?.role === "ADMIN" && <div><Link href="/admin/dashboard">Dashboard</Link> <Link href="/admin/orders" className="hover:underline">Manage Orders</Link></div>}
        {user && (
          <button onClick={logout} className="bg-red-400 hover:bg-red-300 text-white px-3 py-1 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
}
