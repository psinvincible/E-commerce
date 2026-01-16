import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required!"],
            minLength: 3,
            trim: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "Price is required!"],
            min: 1,
        },
        category:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
        images: {
            type: String,
            default: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE="
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },{timestamps: true}
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;