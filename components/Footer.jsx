import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa"

export default function Footer(){
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16 ">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">E-Commerce</h2>
                    <p className="text-sm">Your one-stop shop for quality products at the best price.</p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Shop</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products" className="hover:text-white">All Products</Link></li>
                        <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
                        <li><Link href="/orders" className="hover:text-white">My Orders</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                    <div className="flex gap-4 text-xl">
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaFacebook /></a>
                        <a href="#" className="hover:text-white"><FaTwitter /></a>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-700 text-center text-sm py-4">
                &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
            </div>

        </footer>
    )
}