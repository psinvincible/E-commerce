"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";

export default function AdminProductPage() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
      const fetchProducts = async () => {
      const res = await fetch("/api/products", {
      cache: "no-store",
  });

  const data = await res.json();
  setProducts(data);
  setPageLoading(false);
    }
    fetchProducts();
  }, [])
  

  const handleDelete = async (id) => {
    try {
      const data = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if(!data) throw new Error("failed");
      setProducts(products.filter((p) => p._id !== id)); // this will remove product instantly
      toast.success("Product Removed successfully");
    } catch (error) {
      toast.error(error);
    }finally {
      setLoading(false);
    } 
  };

  

  if(pageLoading) {
    return <Spinner />
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <button onClick={() => router.push("/admin/products/add")} className="bg-black text-white rounded p-1 m-1">Add Product</button>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>S.no</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p._id} className="border-b">
              <td className="text-center">{index +1}</td>
              <td className="text-center">{p.name}</td>
              <td className="text-center">₹{p.price}</td>
              <td className="text-center">{p.stock}</td>
              <td className="text-center">{p.category}</td>
              <td className="text-center">{p.description}</td>
              <td className="text-center"><button className="bg-blue-500 hover:bg-blue-400 cursor-pointer text-white rounded m-1 p-1" onClick={() => router.push(`/admin/products/edit/${p._id}`)}>Edit</button>
              <button className="bg-red-500 hover:bg-red-400 text-white rounded cursor-pointer m-1 p-1" onClick={() => handleDelete(p._id)} disabled={loading}>{loading ? "Removing..." : "Delete"}</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


