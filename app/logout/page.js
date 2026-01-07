"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const router = useRouter();
    const { logout } = useAuth();
    useEffect(() => {
      logout().then(() => {
        router.replace("/login");
      })
    }, [])
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/10 px-8 py-6 shadow-lg backdrop-blur">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        <p className="text-white text-sm">
          Logging Out…
        </p>
      </div>
    </div>
    )
}