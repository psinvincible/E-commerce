"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminAddProducts = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetch("/api/admin/categories").then(res => res.json()).then(data => setCategories(data));
  
  }, [])
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const error = validateImage(file);
    if (error) {
      toast.error(error);
      return;
    }

    const data = new FormData();
    data.append("file", file);

    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error);
        return;
      }

      setForm({ ...form, image: result.url });
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required!";
    if (form.price <= 0) return "Price must be greater than 0!";
    if (form.stock < 0) return "Stock cannot be negative";
    if(!form.category) return "Please Select Category";

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
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    if (!form.image) {
      toast.error("Please upload image");
      return;
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
      });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BreadCrumbs />
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form
        onSubmit={addProduct}
        className="bg-white rounded-xl shadow-md p-6  space-y-5 "
      >
        <div>
          <label className="block text-sm font-medium mb-1">Product name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            disabled={loading}
            placeholder="Name"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              disabled={loading}
              placeholder="Price"
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              disabled={loading}
              placeholder="No. of Stocks"
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 border"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" onChange={handleChange} value={form.category} className="w-full border rounded-lg px-3 py-2">
            <option value="">Select Category</option>
             {categories.filter(category => category.isActive).map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Product Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="border"
          />
          {uploading && (
            <p className="text-sm text-gray-500  mt-1">Uploading Image...</p>
          )}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-32 h-32 object-cover border mt-3 rounded"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            disabled={loading}
            placeholder="Description"
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-2 py-2 rounded"
          disabled={loading || uploading}
        >
          {loading ? "Saving Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProducts;
