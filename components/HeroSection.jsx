import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Shop Smarter. <br /> Live Better.
          </h1>
          <p className="text-gray-300 text-lg">
            Discover quality products at the best prices. Trusted by thousands
            of happy customers.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
              <Link href="/products">Shop Now</Link>
            </button>
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
              View Deals
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <img src="/hero-product.png" className="rounded-xl shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
