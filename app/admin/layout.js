import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function AdminLayout({children}) {

    const user = await getUserFromCookie();

    if(!user || user.role !== "ADMIN"){
        redirect("/login");
    }

    return (
        <>
        <div>
            {children}
            <Toaster position="top-right"/>
        </div>
        </>
    )
    
}