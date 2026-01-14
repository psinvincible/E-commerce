"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi"

export default function Searchbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") || "";

    const [search, setSearch] = useState(initialSearch);

    const handleSearch = (e) => {
        e.preventDefault();

        if(!search.trim()){
            router.push("/products");
            return;
        }
        router.push(`/products?search=${encodeURIComponent(search)}`);
    }
    return (
        <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto flex items-center gap-2 bg-white border-rounded-full px-4 py-2 shadow-sm">
            <FiSearch className="text-gray-400 text-lg"/>
            
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none text-sm bg-transparent"/>
            <button className="text-sm bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition">Search</button>
        </form>
    )
}