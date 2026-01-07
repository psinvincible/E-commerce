import { connectDB } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import Cart from "@/models/Cart";

export async function DELETE(req, { params }) {
  await connectDB();

  const user = await getUserFromCookie();
  if (!user) {
    return Response.json(
      { error: "Please Login to Continue" },
      { status: 401 }
    );
  }

  const { productId } = await params;

  const cart = await Cart.findOne({ userId: user.id });
  if (!cart) {
    return Response.json({ error: "Cart not found!" }, { status: 404 });
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  return Response.json({ message: "Item removed from cart!" });
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const user = await getUserFromCookie();
    if (!user) {
      return Response.json(
        { error: "Please Login to Continue" },
        { status: 401 }
      );
    }

    const { productId } = await params;
    const { quantity } = await req.json();

    if (quantity < 0) {
      return Response.json(
        { error: "Quantity cannot be negative" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId: user.id });
    if (!cart) {
      return Response.json({ error: "Cart cannot be found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    return Response.json({ message: "Cart Updated", cart });
  } catch (error) {
    console.error("Error occured:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
