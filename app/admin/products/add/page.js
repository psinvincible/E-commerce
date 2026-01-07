"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const adminProducts = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async(e) => {
    const file = e.target.files[0];

    if(!file) return;

    const error = validateImage(file);
    if(error){
      toast.error(error);
      return;
    }

    const data = new FormData();
    data.append("file", file);

    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data
      })

      const result = await res.json();

      if(!res.ok){
        toast.error(result.error);
        return;
      }

      setForm({...form, image: result.url});
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed!")
    }finally {
      toast.dismiss();
      setUploading(false);
    }
  }

  const validate = () => {
    if (!form.name.trim()) return "Name is required!";
    if (form.price <= 0) return "Price must be greater than 0!";
    if (form.stock < 0) return "Stock cannot be negative";

    return null;
  };

  const validateImage = (file) => {
    if (!file.type.startsWith("image/")) {
      return "Only images file are allowed";
    }

    if (file.size > 2 * 1024 * 1024) {
      return "Image must be under 2MB only";
    }
    return null;
  }

  const addProduct = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    if(!form.image){
      toast.error("Please upload image");
    }

    setLoading(true);

    try {
      const data = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!data.ok) {
        toast.error(data.error || data.errors?.[0]);
        return;
      }
      toast.success("Product saved successfully");
      setForm({
        name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
      })
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={addProduct} className="space-y-3 ">
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          className="input outline-amber-300 border"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="input border"
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="input border"
        />
        <input
          name="stock"
          type="number"
          placeholder="No. of Stocks"
          onChange={handleChange}
          className="input border"
        />
        <input 
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="border"
        />
        {form.image && (
          <img src={form.image} alt="preview" className="w-32 h-32 object-cover border" />
        )}

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="input border"
        />
        <button
          type="submit"
          className="bg-black text-white px-2 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default adminProducts;
