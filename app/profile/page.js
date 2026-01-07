import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import User from "@/models/User";
import Link from "next/link";

export default async function ProfilePage() {
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return(
            <div className="min-h-screen flex items-center justify-center">
                <p>Please login to view profile!</p>
            </div>
        )
    }

    const userInfo = await User.findById({_id: user.id});
    if(!userInfo){
        return <p>Something went wrong, User not found.</p>
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <div className="space-y-2">
                    <p><strong>Name:</strong>{userInfo.name}</p>
                    <p><strong>Email:</strong>{userInfo.email}</p>
                    <p><strong>Role:</strong>{userInfo.role}</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/orders" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">My Orders</Link>
                    <Link href="/logout" className="px-4 py-2 rounded hover:bg-gray-100">Logout</Link>
                </div>
            </div>
        </div>
    )
    
}