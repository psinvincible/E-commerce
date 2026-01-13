"use client";

import Spinner from "@/components/Spinner";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";

const AdminEditProduct = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoader(true);

      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setForm(data);
      } catch (error) {
        toast.error("Product could not be fetched!");
        return;
      } finally {
        setLoader(false);
      }
    };
    fetchProduct();
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

      if (!data.ok) throw new Error("Failed");
      router.push("/admin/dashboard");
      toast.success("Product Edited successfully");
    } catch (error) {
      toast.error("Something went wrong");
      return;
    } finally {
      setLoading(false);
    }
  };

  if (loader) return <Spinner />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <form
        onSubmit={handleEditProduct}
        className="bg-white rounded-xl shadow-md space-y-5 p-6"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Product name</label>
          <input
            name="name"
            value={form.name}
            disabled={loading}
            type="text"
            placeholder="Name"
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              name="price"
              value={form.price}
              disabled={loading}
              type="number"
              placeholder="Price"
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              name="stock"
              value={form.stock}
              disabled={loading}
              type="number"
              placeholder="No. of Stocks"
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 border"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            name="category"
            value={form.category}
            disabled={loading}
            placeholder="Category"
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
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
          disabled={loading}
        >
          {loading ? "Saving Product..." : "Edit Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
