import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Cart from "@/models/Cart";
import Product from "@/models/Product";


export async function GET(){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return Response.json({error: "Please Login to Continue"}, {status: 401});
    }

    let cart = await Cart.findOne({userId: user.id}).populate("items.productId");

    if(!cart){
        cart = await Cart.create({userId: user.id, items: []})
    }

    return Response.json(cart);
}

export async function POST(req){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return Response.json({error: "Please Login to Continue"}, {status: 401});
    }

    const { productId, quantity = 1} = await req.json();

    const product = await Product.findById(productId);
    if(!product){
        return Response.json({error: "Product not found!"}, {status: 401});
    }
    
    const cart = await Cart.findOne({userId: user.id});
    if(!cart){
        cart = await Cart.create({
            userId: user.id,
            items: [{productId, quantity}],
        })
    }else {
        //ise samajh lena ek baar time nikal kar
        const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    }

    return Response.json({message: "Product added to cart!"});
}

export async function PUT(req){
    await connectDB();

    const user = await getUserFromCookie();
    if(!user){
        return Response.json({error: "Please Login to Continue"}, {status: 401});
    };

    const {productId, quantity} = await req.json();
    if(quantity < 1){
        return Response.json({error: "Invalid quantity"},{status: 400});
    }

    const cart = await Cart.findOne({userId: user.id})
    if(!cart){
        return Response.json({error: "Cart not Found!"},{status: 404});
    }

    const item = cart.items.find(
        (item) => item.productId.toString() === productId
    )
    if(!item){
        return Response.json({error: "Item not found!"}, {status: 404});
    }

    item.quantity = quantity;
    await cart.save();

    return Response.json({message: "Cart updated!"});
}

