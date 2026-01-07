import AddToCartBtn from "@/components/AddToCartBtn";

export default async function ProductPage({params}) {
    const {id} = await params;
    
    const data = await fetch(`http://localhost:3000/api/products/${id}`, {
        cache: "no-store",
    });
    const product = await data.json();

    return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <img src={product.images} className="w-full h-96 object-cover" />

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl">₹{product.price}</p>
        <p className="mt-4">{product.description}</p>
        <AddToCartBtn productId={id}/>        
      </div>
    </div>
  );    
}