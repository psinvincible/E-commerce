export default function TrustBadges() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {["Fast Delivery", "Secure Payments", "Easy Returns", "24/7 support"].map((item) => (
        <div key={item} className="bg-linear-to-r from-teal-400 to-yellow-200 p-6 rounded-xl shadow">
            <p  className="font-semibold text-gray-800">{item}</p>
        </div>
      ))}
    </section>
  );
}
