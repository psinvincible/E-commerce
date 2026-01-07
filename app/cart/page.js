"use client"

import Spinner from "@/components/Spinner";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Cart(id, qty) {
    const { fetchCount } = useCart();
    const [pageLoading, setPageLoading] = useState(true);
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        try {
            const res = await fetch("/api/cart", {cache: "no-store"});
            fetchCount();
            if(!res.ok){
                setCart(null);
                return;
            }
            const data = await res.json();
            console.log(data);
            setCart(data);
        } catch {
            setCart(null);
        }finally{
            setPageLoading(false);
        }
      }
    
    useEffect(() => {      
      fetchCart();      
    }, [])
    

    const updateQty = async(id, qty) => {
        await fetch(`/api/cart/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({quantity: qty}),
        });
        fetchCart();
        toast.success("Cart Updated")
    }

    const removeItem = async(id)=> {
        await fetch(`/api/cart/${id}`, {
            method: "DELETE"
        });
        fetchCart();
        toast.error("Item removed!")
    }    


    if(pageLoading) return <Spinner />

    if(!cart || cart.items.length === 0){
        return (
            <div className="p-6">
                <h2 className="text-bold text-xl">Your cart is empty!</h2>
                <Link href="/" className="text-blue-500">Continue Shopping</Link>
            </div>
        )
    }

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    )
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.items?.map((item) => (
                <div key={item.productId._id} className="flex gap-4 border-b py-4">
                    <img src={item.productId.images || "/placeholder.png"}  className="w-20 h-20 object-cover border"></img>
                    <div className="flex-1">
                        <h3 className="font-bold">{item.productId.name}</h3>
                        <p>₹ {item.productId.price}</p>

                        <div className="flex gap-2 items-center mt-2">
                            <button onClick={() => updateQty(item.productId._id, item.quantity -1)} className="cursor-pointer p-2 text-2xl">-</button>
                            <span className="text-2xl font-bold">{item.quantity}</span>
                            <button onClick={() => updateQty(item.productId._id, item.quantity +1)} className="cursor-pointer p-2 text-2xl">+</button>
                        </div>
                    </div>
                        <button onClick={() => removeItem(item.productId._id)} className="text-red-500 cursor-pointer">Remove</button>
                </div>
            ))}
            <div className="text-right mt-6">
                <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
                <Link href="/checkout"><button className="bg-black text-white px-4 py-2 mt-2" >Checkout</button></Link>
                
            </div>
        </div>
    )


}