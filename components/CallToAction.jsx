import Link from "next/link";

export default function CallToAction(){
    return(
        <section className="bg-black text-white">
            <div className="mx-w-7xl mx-auto px-6 py-20 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to start shopping?</h2>
                <p className="text-gray-400">Create an account and get exclusive offers.</p>
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition"><Link href="/signup">Get Started</Link></button>
            </div>
        </section>
    )
}