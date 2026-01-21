import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Product from "@/models/Product";

export async function GET(req){
    try {
        await connectDB();

    const user = await getUserFromCookie();
    if(!user && user.role !== "ADMIN"){
        return Response.json({error: "Unauthorized"},{status: 401});
    }

    const {searchParams} = new URL(req.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const filter = {};

    if(query){
        filter.name = {$regex: query, $options: "i"
        };
    }
    if(category){
        filter.category = category;
    }

    const products = await Product.find(filter).populate("category", "name slug").skip(skip).limit(limit).sort({createdAt: -1});
    const total = await Product.countDocuments(filter);

    return Response.json({products, pagination: {total, page, pages: Math.ceil(total / limit), limit}});    
    } catch (error) {
     return Response.json({error: "failed to fetch products!"},{status: 500});
    }
}