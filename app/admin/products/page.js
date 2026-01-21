"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ProductPagination from "@/components/products/ProductPagination";
import BreadCrumbs from "@/components/BreadCrumbs";

export default function AdminProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "";
  const page = Number(searchParams.get("page")) || 1;
  
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [pagination, setPagination] = useState({
    pages: 1,
    page: 1,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setPageLoading(true);
      const res = await fetch(`/api/admin/products?q=${query}&category=${category}&page=${page}`, {
        cache: "no-store",
      });

      const data = await res.json();
      setProducts(data.products);
      setPagination(data.pagination);
      setPageLoading(false);
    };
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setProductCategories(data));
       setSearch(query);
    setCategory(urlCategory);
    fetchProducts();
  }, [query, urlCategory, page]);

  const handleDelete = async (id) => {
    try {
      const data = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!data) throw new Error("failed");
      setProducts(products.filter((p) => p._id !== id)); // this will remove product instantly
      toast.success("Product Removed successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (page) => {
    router.push(`/admin/products?q=${query}&category=${category}page=${page}`);
  }


  const applyFilter =() => {
    const params = new URLSearchParams();

    if(search) params.set("q", search.trim());
    if(category) params.set("category", category);
    params.set("page", "1");
    router.push(`/admin/products?${params.toString()}`);
  }

  
  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <BreadCrumbs />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href={`/admin/products/add`} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900">
          + Add Product
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input 
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-1/3"
        />
        <select 
        value={urlCategory}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 w-full rounded md:w-1/4"
        >
          <option value="">All Category</option>
          {productCategories.map((productCategory) => (
            <option key={productCategory._id} value={productCategory._id}>{productCategory.name}</option>
          ))}
        </select>
        <button onClick={applyFilter} className="bg-black text-white px-4 py-2 rounded">Apply</button>
      </div>

      <div className="hidden md:block bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr className="border-b">
              <th className="p-3">S.no</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Category</th>
              <th className="p-3">Description</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p._id} className="border-t hover:bg-gray-200">
                <td className="text-center p-3">{(pagination.page - 1 ) * pagination.limit + index + 1}</td>
                <td className="text-center p-3">{p.name}</td>
                <td className="text-center p-3">₹{p.price}</td>
                <td className="text-center p-3">{p.stock}</td>
                <td className="text-center p-3">{typeof p.category === 'object' ? p.category?.name : p.category}</td>
                <td className="text-center p-3">{p.description}</td>
                <td className="text-center p-3 flex gap-3">
                    <Link href={`/admin/products/edit/${p._id}`} className="bg-blue-500 hover:bg-blue-400 cursor-pointer text-white rounded m-1 p-1">Edit</Link>
                  <button
                    className="bg-red-500 hover:bg-red-400 text-white rounded cursor-pointer m-1 p-1"
                    onClick={() => handleDelete(p._id)}
                    disabled={loading}
                  >
                    {loading ? "Removing..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <ProductPagination pagination={pagination} changePage={changePage}/>
    
      <div className="md:hidden space-y-4 ">
        {products.map((product, index) => (
          <div key={product._id} className="bg-white border rounded-xl p-4 flex gap-4 ">
            <img src={product.images} className="h-20 w-20 object-contain rounded" alt={product.name}/>
            
            <div className="flex-1">
              <h2 className="font-semibold ">{product.name}</h2>
              <p className="text-sm text-gray-500">₹{product.price}</p>
              <p className="text-xs text-gray-500">{typeof product.category === 'object' ? product.category?.name : product.category}</p>
              <p className={`text-xs mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
              <div className="flex gap-4 mt-3">
                <Link href={`/admin/products/edit/${product._id}`} className="bg-blue-500 hover:bg-blue-400 cursor-pointer text-white rounded m-1 p-1">Edit</Link>
                  <button
                    className="bg-red-500 hover:bg-red-400 text-white rounded cursor-pointer m-1 p-1"
                    onClick={() => handleDelete(product._id)}
                    disabled={loading}
                  >
                    {loading ? "Removing..." : "Delete"}
                  </button>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}
