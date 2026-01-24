"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [search, setSearch] = useState("");
  
  const { user, loading, logout } = useAuth();
  const { count } = useCart();
  const router = useRouter();

const handleSearch = (e) => {
  e.preventDefault();
  if(!search.trim()) return;

  router.push(`/products?q=${encodeURIComponent(search.trim())}`);
  setSearch("");
}

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-extrabold tracking-wide">
          <span className="text-cyan-600">E</span>-Commerce
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-black text-gray-600">
            Store
          </Link>
          
          <form onSubmit={handleSearch} className="hidden md:block">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Products..." className="border rounded-lg px-3 py-1.5 text-sm w-56 focus:ring-2 focus:ring-black"></input>
          </form>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <IoCartOutline size={18}/>
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {count}
              </span>
            )}
          </Link>

          {!user ? (
            <Link
              href="/login"
              className="bg-cyan-300 rounded p-2 hover:bg-cyan-200 shadow-md"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              {/* services section ADMIN */}
              {user?.role === "ADMIN" && (
            <div className="relative">  
              <button
                onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Services
                <RiArrowDropDownLine size={20} />
              </button>
              {openDropdown === "services" && (
                <div className="absolute left-0 mt-2 w-37 bg-white rounded-lg shadow-xl border overflow-hidden">
                  
                    <div className="">
                      <Link
                        onClick={() => setOpenDropdown(null)}
                        href="/admin/dashboard"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                      onClick={() => setOpenDropdown(null)}
                        href="/admin/categories"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Categories
                      </Link>
                      <Link
                      onClick={() => setOpenDropdown(null)}
                        href="/admin/products"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Manage Products
                      </Link>
                      <Link
                      onClick={() => setOpenDropdown(null)}
                        href="/admin/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Manage Orders
                      </Link>
                      <Link
                      onClick={() => setOpenDropdown(null)}
                        href="/admin/contact"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Contact Messages
                      </Link>
                    </div>
                </div>
              )}
            </div>
             )}
            {/* Account SEction */}
            <div className="relative">  
              <button
                onClick={() => setOpenDropdown(openDropdown === "accounts" ? null : "accounts")}
                className="flex items-center  py-2 rounded-md"
              >
                <VscAccount size={20} />
              </button>

      
              {openDropdown === "accounts" && (
                <div className="absolute right-0 mt-2 w-37 bg-white rounded-lg shadow-xl border overflow-hidden">
                  <Link
                  onClick={() => setOpenDropdown(null)}
                    href="/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Orders
                  </Link>

                  <Link
                  onClick={() => setOpenDropdown(null)}
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-red-300 rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            </div>
          )}
        </nav>

        {/* hamburger menu*/}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          <RxHamburgerMenu />
        </button>
      </div>

      {/* mobile view */}
      {open && (
        <div
          className={`md:hidden fixed top-0 right-0 z-50 h-full w-[70%] shadow-lg transition-transform duration-300 ease-in-out bg-white/70 backdrop-blur-md ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-5 py-5 border-b border-gray-500">
            <GrClose
              className="text-xl cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <p className="text-lg font-extrabold tracking-wide">
              <span className="text-cyan-600">E</span>-Commerce
            </p>
          </div>

          <form onSubmit={handleSearch} className="p-4">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Products..." className="w-full border rounded-lg px-3 py-2 "></input>
          </form>

          <div className="flex flex-col gap-3 mt-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block text-center rounded mx-20 bg-gray-200"
            >
              Home
            </Link>

            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="block text-center rounded mx-20 bg-gray-200"
            >
              Store
            </Link>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="block text-center rounded mx-20 bg-gray-200"
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
                <div className="flex flex-col gap-3 mt-3">
                  {user.role === "ADMIN" && (
                    <div>
                      <p className="text-center text-bold text-gray-500 border mx-20 rounded border-gray-500">Admin Section</p>
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setOpen(false)}
                        className="block text-center rounded mx-20 my-2 bg-gray-200"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/admin/products"
                        onClick={() => setOpen(false)}
                        className="block text-center rounded mx-20 my-2 bg-gray-200"
                      >
                        Manage Products
                      </Link>
                      <Link
                        href="/admin/orders"
                        onClick={() => setOpen(false)}
                        className="block text-center rounded mx-20 my-2 bg-gray-200"
                      >
                        Manage Orders
                      </Link>
                    </div>
                  )}
                  <Link href="/orders" onClick={() => setOpen(false)} className="block text-center rounded mx-20 bg-gray-200">
                    Orders
                  </Link>
                  <Link href="/profile" onClick={() => setOpen(false)} className="block text-center rounded mx-20 bg-gray-200">
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      setOpen(false);
                      await logout();
                    }}
                    className="bg-red-400 hover:bg-red-300 mx-20 text-white px-3 py-1 rounded"
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
