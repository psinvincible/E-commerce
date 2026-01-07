import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Product from "@/models/Product";

export async function GET(req, {params}){
    await connectDB();

    //const user = await getUserFromCookie();

    /* if(user.role !== "ADMIN"){
        return Response.json({error: "Only admin can access"});
    } */

    const {id} = await params;

    const product = await Product.findById({_id: id});

    return Response.json(product);
}

export async function PUT(req, {params}){
    await connectDB();

    const user = await getUserFromCookie();

    if(user.role !== "ADMIN"){
        return Response.json({error: "Only Admin can access."})
    }

    const data = await req.json();
    const { id } = await params;

    const updatedProduct = await Product.findByIdAndUpdate(
       { _id: id},
        data,
        { new : true},
    )

    return Response.json({message: "Product updated successfully."}, updatedProduct);
}

export async function DELETE(req, {params}) {
    await connectDB();

    const user = await getUserFromCookie();

    if(user.role !== "ADMIN"){
        return Response.json({error: "Only admin can access"});
    }
    const { id } = await params;
    const product = await Product.findByIdAndDelete(id);

    return Response.json({message: "Product Removed Successfully!"});
}

