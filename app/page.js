"use client"

import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";

export default function Home() {
  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => { 
      const res = await fetch("/api/products", {
    cache: "no-store",
  });

  const products = await res.json();
  setProducts(products);
  setPageLoading(false);
  }
  fetchProducts();
  }, [])
  
  if(pageLoading) {
      return (
        <div className="p-6 animate-pulse">
      <div className="h-6 bg-gray-300 w-1/3 mb-4"></div>
      <div className="grid grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
      )
    }

  return (
    <>
      <div className="">
        Welcome to ecommerce page. We are developing this page. Work in progress.
      </div>
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <a
          key={p._id}
          href={`/products/${p._id}`}
          className="border p-3 rounded"
        >
          <img src={p.images} className="h-40 w-full object-cover" />
          <h2 className="font-semibold">{p.name}</h2>
          <p>₹{p.price}</p>
        </a>
        ))}
      </div>
    </>
  );
}
