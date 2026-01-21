import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    await connectDB();

    const products = await Product.find({isActive: true}).sort({createdAt: - 1}).limit(6).select("name price images");

    return Response.json(products);
}