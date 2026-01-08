export default function FeaturedProducts(){
    return(
        <section className="max-w-xl mx-auto px-6 py-16">
            <div className="flex justify-center items-center mb-8">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <button className="text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {[1,2,3,4].map((product) => (
                    <div key={product} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                        <div className="h-40 bg-gray-100 rounded mb-4"/>
                        <h3 className="font-medium">Product Name</h3>
                        <p className="text-sm text-gray-500">₹999</p>
                    </div>
                ))}
            </div>
        </section>
    )
}