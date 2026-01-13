import AddToCartBtn from "@/components/AddToCartBtn";
import Review from "@/components/Review";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const data = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  const product = await data.json();

  return (
    <div className="p-6 max-w-6xl mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-xl border p-4">
        <img src={product.images} alt={product.name} className="w-full h-100 object-contain" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold text-green-600">₹{product.price}</p>
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="">
          <AddToCartBtn disabled={product.stock === 0} productId={id} />
          </div>
        </div>
        <Review productId={product._id.toString()} />
      </div>
    </div>
  );
}
