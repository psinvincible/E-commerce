import React from 'react'

const ProductGrid = ({loading, products}) => {
  return (
    <>
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
    </>
  )
}

export default ProductGrid
