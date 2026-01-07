import AdminLink from "@/components/admin/AdminLink";
import Stat from "@/components/admin/Stat";
import { connectDB } from "@/lib/db"
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  await connectDB();
  const user = await getUserFromCookie();
  if(!user){
    toast.error("Login required!");
    redirect("/login");
  }

  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();
  const pendingOrders = await Order.countDocuments({
    status: { $in: ["PLACED", "CONFIRMED", "SHIPPED"]}
  });

  const totalAmt = await Order.aggregate([
    {$match : { status: "DELIVERED"}},
    {$group: { _id: null, total: {$sum: "$totalAmount"}}}
  ])
  
  const totalEarnings = totalAmt[0]?.total || 0;

  return(
    <div className="p-6 max-w-xl mx-auto">
    <h1 className="text-3xl font-fold mb-6">Admin Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat title="Users" value={totalUsers}/>
      <Stat title="Orders" value={totalOrders}/>
      <Stat title="Total Earnings" value={`₹${totalEarnings}`}/>
      <Stat title="Pending Orders" value={pendingOrders}/>
    </div>
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
      <AdminLink href="/admin/orders" label="Manage Orders"/>
      <AdminLink href="/admin/products" label="Manage Products" />
      <AdminLink href="/admin/user" label="User"/>
      <AdminLink href="/" label="Go to Store"/>
    </div>
    </div>

  )
   
}


