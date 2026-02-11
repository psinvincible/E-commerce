"use client"

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function AddToCartBtn({productId}) {
    const { fetchCount } = useCart();

    const router = useRouter();
    const addToCart = async() => {
      try {
        const res = await fetch("/api/cart",{
          method: "POST",
          credentials: "include",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            productId: productId,
            quantity: 1
          })
        })

        if(!res.ok){
          throw new error("Failed to add to cart!");
        }
        fetchCount();
        router.push("/cart");
        
      } catch (error) {
     
        alert("Please login to add to your cart.");
        router.push("/login");
      }
    }

    return (
        <button className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-600" onClick={addToCart}>
          Add to Cart
        </button>
    )
    
}