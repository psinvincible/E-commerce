"use client";

import Searchbar from "@/components/SearchBar";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      const products = await res.json();
      setProducts(products);
      setPageLoading(false);
    };
    fetchProducts();
  }, []);

  if (pageLoading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-6 bg-gray-300 w-1/3 mb-4"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="p-4 space-y-6">
        <Searchbar />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {products.map((product) => (
          <a
            key={product._id}
            href={`/products/${product._id}`}
            className="group bg-white rounded-xl shadow-sm border hover:shadow-lg transition overflow-hidden"
          >
            <div className="bg-gray-100 relative h-44 overflow-hidden">
              <img src={product.images} alt={product.name} />
            </div>

            <div className="p-3 space-y-1">
              <h2 className="font-medium text-gray-800 line-clamp-1">
                {product.name}
              </h2>
              <p className="text-black text-lg font-semibold">
                ₹ {product.price}
              </p>
              <p className="text-sm text-gray-500 group-hover:text-black">
                View Details →
              </p>
            </div>
          </a>
        ))}
      </div>
      </div>
    </div>
  );
}
