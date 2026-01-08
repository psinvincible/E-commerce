"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          E-Commerce
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-black text-gray-600">
            Store
          </Link>

          <Link href="/cart" className="relative">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {count}
              </span>
            )}
          </Link>

          {!user ? (
            <Link
              href="/login"
              className="bg-cyan-300 rounded p-2 hover:bg-cyan-200"
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              <button className="font-medium">{user.role || "Account"}</button>

              {/* dropdown menu */}
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block">
                {user?.role === "ADMIN" && (
                  <div className="block">
                    <Link href="/admin/dashboard">Dashboard</Link>{" "}
                    <Link href="/admin/orders" className="hover:underline">
                      Manage Orders
                    </Link>
                  </div>
                )}
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-400 hover:bg-red-300 w-full text-left text-white rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* mobile view button  and hamburger menu*/}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* mobile view */}
      {open && (
        <div
          className={`md:hidden fixed top-0 right-0 z-50 h-full w-[70%] shadow-lg transition-transform duration-300 ease-in-out bg-white/50 backdrop-blur-md ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <svg onClick={() => setOpen(false)} width="30" height="30" viewBox="0 0 100 100" fill="none" className="m-2">
              <circle cx="50" cy="50" r="45" stroke="#22D3EE" strokeWidth="10" />
              <line
                x1="32"
                y1="32"
                x2="68"
                y2="68"
                stroke={"#22D3EE"}
                strokeWidth="10"
                strokeLinecap="round"
                />
              <line
                x1="68"
                y1="32"
                x2="32"
                y2="68"
                stroke={"#22D3EE"}
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
                <p className="text-xl font-bold text-center">E-commerce</p>
          </div>
          <div className="flex flex-col gap-4 p-4 border-b">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="w-full text-center"
            >
              Home
            </Link>

            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="w-full text-center"
            >
              Store
            </Link>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="w-full text-center"
            >
              Cart ({count})
            </Link>

            {!user ? (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full text-center bg-cyan-300 rounded p-2"
              >
                Login
              </Link>
            ) : (
              <>
                  <div className="flex flex-col gap-4 p-4">
                {user.role === "ADMIN" && (
                    <>
                    <Link href="/admin/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                    <Link href="/admin/orders" onClick={() => setOpen(false)} className="hover:underline">
                      Manage Orders
                    </Link>
                    </>
                )}
                <Link href="/orders" onClick={() => setOpen(false)}>Orders</Link>
                <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
                <button
                  onClick={logout}
                  className="bg-red-400 hover:bg-red-300 text-white px-3 py-1 rounded"
                  >
                  Logout
                </button>
                  </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
