import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Category from "@/models/Category";
import slugify from "slugify";

export async function PUT(req, {params}){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user || user.role !== "ADMIN") return Response.json({error: "Unauthorized"},{status: 401});

    const {name, isActive} = await req.json();
    const {id} = await params;
    const update = {};
    if(name){
        update.name = name,
        update.slug = slugify(name, {lower: true});
    }
    if(typeof isActive === "boolean"){
        update.isActive = isActive;
    }

    const category = await Category.findByIdAndUpdate(
        id, update, {new: true}
    )
    console.log(category);
    return Response.json({message: "Category Updated"},{status: 201}, category);
}

export async function DELETE(req, {params}){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user || user.role !== "ADMIN") return Response.json({error: "Unauthorized"},{status: 401});

    const {id} = await params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    return Response.json({message: "Category Deleted Successfully!", deletedCategory}, {status: 200} );
}