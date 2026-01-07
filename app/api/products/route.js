import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Product from "@/models/Product";

export async function POST(req) {
    
    try {
        await connectDB();
    
    const user = await getUserFromCookie();

    if(user.role !== 'ADMIN'){
        return Response.json({error: "Only admin can access!!"});
    }

    const data = await req.json();
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
            return Response.json({error: message});
        }

        return Response.json({error: "Internal Server Error"},{status: 500})        
    }
    
}

export async function GET(){
    await connectDB();
    const products = await Product.find().sort({createdAt: -1});

    return Response.json(products);
}

