"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    const fetchCategories = async() => {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        setCategories(data);
    }
    
    useEffect(() => {
      fetchCategories();
    }, []);

    const addCategory = async() => {
        if(!name.trim()){
           toast.error("Category name required!");
           setName("");
          return;
        } 
        setLoading(true);

        const res = await fetch(`/api/admin/categories`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name.trim(),
            })
        })
        const data = await res.json();
        if(!res.ok){
            toast.error("Category exists");
        }else {
            toast.success("Category Added");
            setName("");
            fetchCategories();
        }
        setLoading(false);
    }

    const toggleStatus = async(id, isActive) => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                isActive: !isActive
            })
        })
        if(!res.ok)return toast.error("Update failed");
        toast.success("Category Status Updated");
        fetchCategories();
      } catch (error) {
        toast.error("Updation failed!");
        return
      }
    }

    const removeCategory = async(id) => {
        if(!confirm("Are you sure to Delete Category?")) return;
        try {
          const res = await fetch(`/api/admin/categories/${id}`,{
            method: "DELETE"
        })
        if(!res.ok) return toast.error("Deletion Failed!");
        toast.success("Category Deleted");
        fetchCategories();
        } catch (error) {
          toast.error("Something went wrong");
          return
        }
    }
    

  return (
    <div className="p-6 max-w-3xl">
      <BreadCrumbs />
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          placeholder="Category Name"
          className="input border flex-1"
        />
        <button
          className="bg-black text-white px-4 rounded"
          disabled={loading}
          onClick={addCategory}
        >
          {loading ? "Adding Category..." : "Add"}
        </button>
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div className="font-medium">
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-gray-500">/{category.slug}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleStatus(category._id, category.isActive)}
                className={`px-3 py-1 rounded text-sm ${
                  category.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200"
                }`}
              >
                {category.isActive ? "Active" : "Inactive"}
              </button>

              <button
                onClick={() => removeCategory(category._id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
