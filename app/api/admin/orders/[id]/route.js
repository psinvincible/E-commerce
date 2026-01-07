import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Order from "@/models/Order";

export async function PUT(req, { params }) {
  await connectDB();
  const {id} = await params;
  
  const user = await getUserFromCookie();
  if (!user || user.role !== "ADMIN") {
    return Response.json(
      { error: "Admin privilage is required" },
      { status: 401 }
    );
  }

  const {status} = await req.json();
  if(!status){
    return Response.json({error: "Status is required!"},{status: 400})
  }

  const order = await Order.findByIdAndUpdate(
    id, {status}, {new: true}
  )
  
  return Response.json(order);
}
