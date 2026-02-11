import mongoose from "mongoose";

const MONGODB_URI = `${process.env.MONGODB_URI}ecommerce`;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Database already connected");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected!!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}
