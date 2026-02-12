"use client";

export const dynamic = "force-dynamic";

import BreadCrumbs from "@/components/BreadCrumbs";
import CategorySidebar from "@/components/products/Category";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";
import Searchbar from "@/components/SearchBar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    pages: 1,
    page: 1,
  });
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/products?q=${query}&category=${category}&page=${page}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      setProducts(data.products);
      setPagination(data.pagination);
      setLoading(false);
      setPageLoading(false);
    };

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetchProducts();
  }, [query, page, category]);

  const changePage = (page) => {
    router.push(`/products?q=${query}&category=${category}&page=${page}`);
  };

  const handleCategory = (categoryId) => {
    router.push(`/products?q=${query}&category=${categoryId}&page=1`);
  };

  if (pageLoading || loading) {
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
      <BreadCrumbs />
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="p-4 space-y-6">
        <Searchbar />
        {query && (
          <p className="mb-4 text-sm text-gray-600">
            Showing results for <span className="font-semibold">{query}</span>
          </p>
        )}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">
            No products found for "{query}"
          </p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
          <aside className="hidden md:block">
            <CategorySidebar
              categories={categories}
              onChange={handleCategory}
              activeCategory={category}
            />
          </aside>
          <ProductGrid loading={loading} products={products} />
        </div>
          <ProductPagination pagination={pagination} changePage={changePage} />
      </div>
    </div>
  );
}
