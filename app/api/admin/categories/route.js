import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Category from "@/models/Category";
import slugify from "slugify"

export async function GET() {
    await connectDB();
    
    const categories = await Category.find().sort({createdAt: -1});
    if(!categories) return Response.json({error: "Categories not Found"},{status: 404});

    return Response.json(categories);   
}

export async function POST(req) {
    await connectDB();

    const user = await getUserFromCookie();
    if(!user || user.role !== "ADMIN"){
        return Response.json({error: "Unauthorized"},{status: 401});
    };

    const {name} = await req.json();
    if(!name) return Response.json({error: "Category Name Required!"},{status: 400});

    const slug = slugify(name, {lower: true});

    const exists = await Category.findOne({slug});
    if(exists) return Response.json({error: "Category already exists!"},{status: 400});

    const category = await Category.create({name, slug});
    return Response.json({message: "Category Created."}, category, {status: 201});
}