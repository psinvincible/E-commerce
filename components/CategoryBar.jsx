"use client"

import Category from "@/models/Category";
import { useRouter } from "next/navigation";

export default function CategoryBar() {
    const router = useRouter();
    return (
        <div className="flex gap-3 overflow-x-auto py-2">
            <button onClick={() => router.push(`/products/`)} className={`px-4 py-2 rounded-full border ${!isActive ? "bg-black text-white" : "bg-white"}`}>
                All
            </button>
            {categories.map((category) => (
                <button key={category._id} onClick={() => router.push(`/products?category=${category.slug}`)}
                className={`px-4 py-2 rounded-full border whitespace-nowrap ${active === category.slug ? "bg-black text-white" : "bg-white"} `}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}