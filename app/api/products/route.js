import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function POST(req) {
    
    try {
        await connectDB();
    
    const user = await getUserFromCookie();

    if(user.role !== 'ADMIN'){
        return Response.json({error: "Only admin can access!!"});
    }

    const data = await req.json();

    const category = await Category.findById(data.category);
    if(!category || !category.isActive){
        return Response.json({error: "Invalid Category!"},{status: 400})
    }
    console.log(data.category);
    const product = await Product.create({
        name: data.name,
      price: data.price,
      category: data.category,
      stock: data.stock,
      description: data.description,
      images: data.image,
    });

    return Response.json(product);

    } catch (error) {
        if(error.name === "ValidationError"){
            const message = Object.values(error.errors).map(
                (err) => err.message
            )
            return Response.json({error: message},{status: 400});
        }

        return Response.json({error: "Internal Server Error"},{status: 500})        
    }
    
}

export async function GET(req){
    try {
        await connectDB();
        
        const {searchParams} = new URL(req.url);

        const query = searchParams.get("q");
        const category = searchParams.get("category");
        const page = Number(searchParams.get("page")) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        const filter = {};

        if(query){
            filter.name = {$regex: query, $options: "i"};
        }

        if(category){
            filter.category = category;
        }

        const products = await Product.find(filter).populate("category", "name slug").skip(skip).limit(limit).sort({createdAt: -1});
        const total = await Product.countDocuments(filter);
        

        return Response.json({products, pagination: {total, page, pages: Math.ceil(total / limit) }})
    } catch (error) {
        return Response.json({error: "failed to fetch products!"},{status: 500});
    }
}

