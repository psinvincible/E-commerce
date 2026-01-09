import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Review from "@/models/Review";
import User from "@/models/User";

export async function GET(req, {params}){
    await connectDB();
    const {id} = await params;
    const reviews = await Review.find({
        productId: id
    }).populate("userId", "name").sort({createdAt: -1}).lean();

    return Response.json(reviews, {message: "Success"},{status: 201});
}

export async function POST(req,{params}){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return Response.json({error: "Login Required!"},{status: 401});
    }
    const {rating, comment} = await req.json();

    if(!rating || !comment){
        return Response.json({error: "All fields are required!"},{status: 400});
    }
    const {id} = await params;
    const findReview = await Review.findOne({userId: user.id});
    if(findReview){
        return Response.json({error: "Review already added!"},{status: 409});
    }
    const review = await Review.create({
        userId: user.id,
        productId: id,
        rating,
        comment,
    });
     
    return Response.json(review, {message: "Review created"},{status: 201});

}
