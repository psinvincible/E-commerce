"use client"

export default function CategorySidebar({ categories, activeCategory, onChange}){
    
    return (
        <div className="space-y-2">
            <button onClick={() => onChange("")}
            className={`block w-full text-left px-3 py-2 rounded ${
                !activeCategory ? "bg-black text-white" : "hover:bg-gray-100"
            }`}    
            >All Products</button>

            {categories.map((category) => (
                <button key={category._id}
                onClick={() => onChange(category._id)}
                className={`block w-full text-left px-3 py-2 rounded ${
                    activeCategory === category._id ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
                >{category.name}</button>
            ))}

        </div>
    )
}