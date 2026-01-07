import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            requied: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        }
    },
    {_id: false}
);

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [cartItemSchema],
    },{timeStamps: true}
)

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;