"use client"

import { useAuth } from "./AuthContext";

const { createContext, useState, useEffect, useContext } = require("react")

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user, loading } = useAuth();
    const [count, setCount] = useState(0);

    const fetchCount = async () => {
        if(!user){
            setCount(0);
            return;
        }
        try {
            const res = await fetch("/api/cart/count",{
                credentials: "include",
                cache: "no-store"
            });
            if(!res.ok){
                setCount(0);
                return;
            }
            const data = await res.json();
            console.log(data);
            setCount(data.count ?? 0);
        
        } catch (error) {
            setCount(0);
        }
    }

    useEffect(() => {
            if(!loading){
                fetchCount();
            }
          fetchCount();
        }, [user, loading]);
        
    return (
        <CartContext.Provider value={{count, fetchCount}}>{children}</CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);