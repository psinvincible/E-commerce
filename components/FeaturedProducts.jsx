"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/featured")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <Link
          href={"/products"}
          className="text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 cursor-pointer">
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
    </section>
  );
}
