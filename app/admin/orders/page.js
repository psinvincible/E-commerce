import OrderCard from "@/components/admin/OrderCard";
import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";
import User from "@/models/User";


export default async function AdminOrdersPage() {
    await connectDB();

    const user = await getUserFromCookie();
    if(!user || user.role !== "ADMIN"){
        return <p className="p-6">Unauthorized! Admin Privilage is required.</p>
    }

    const orders = await Order.find().populate("userId", "email").sort({createdAt: -1}).lean();
    if(!orders || orders.length === 0){
        return <p className="p-6">No orders found!</p>
    }
    //above orders are objects with json methods which is not supported 
    //converting the orders into safeOrder
   const safeOrders = JSON.parse(JSON.stringify(orders));

    return (
            <OrderCard safeOrders={safeOrders}/>
    )
}