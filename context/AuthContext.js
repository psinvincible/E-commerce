"use client"

import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async() => {
      try {
        const res = await fetch("/api/auth/getUser",{credentials: "include"});
        if(!res.ok){
          setUser(null);
          setLoading(false);
          return
        }
        const data = await res.json();
        setUser(data);
        return data;
      } catch (error) {
        setUser(null);
      }finally {
        setLoading(false);
      }
    };

    const logout = async() => {
      await fetch("/api/auth/logout",{method: "POST"});
      setUser(null);
      redirect("/login");
    }

    useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser, fetchUser, loading, logout}} >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)