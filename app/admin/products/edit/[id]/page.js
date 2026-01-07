"use client"

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";

const productEditPage = () => {
  const {id} = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };


  const handleEditProduct = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if(!data.ok) throw new Error("Failed");
    router.push("/admin/dashboard");
    toast.success("Product Edited successfully");
    } catch (error) {
       toast.error("Something went wrong")
    }finally {
          setLoading(false);
    }    
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleEditProduct} className="space-y-3 ">
        <input
          name="name"
          value={form.name}
          type="text"
          placeholder="Name"
          onChange={handleChange}
          className="input outline-amber-300 border"
        />
        <input
          name="price"
          value={form.price}
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="input border"
        />
        <input
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
          className="input border"
        />
        <input
          name="stock"
          value={form.stock}
          type="number"
          placeholder="No. of Stocks"
          onChange={handleChange}
          className="input border"
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="input border"
        />
        <button type="submit" className="bg-black text-white px-2 py-2 rounded" disabled={loading}>
          {loading ? "Saving..." : "Edit Product"}
        </button>
      </form>
    </div>
  );
};

export default productEditPage;
