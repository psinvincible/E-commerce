import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
    await connectDB();

    const categories = await Category.find({ isActive: true});
    if(!categories) return Response.json({error: "Category not found!"},{status: 404});

    return Response.json(categories);
}