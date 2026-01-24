"use client"
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if(!form.name || !form.email || !form.message) return toast.error("All fields are required.");

        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(form)
            })

            if(!res.ok) throw new Error("failed");

            toast.success("Message Sent Successfully!");
            setForm({
                name: "", email: "", message: ""
            })

        } catch (error) {
            toast.error("Something Went Wrong!");
        }finally{
            setLoading(false);
        }
    }


  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8 ">
        Have a question or need help? Send us a message.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-semibold mb-4">Get in touch</h2>
          <p className="text-sm text-gray-600 mb-2">India</p>
          <p className="text-sm text-gray-600 mb-2">example@ecommerce.com</p>
          <p className="text-sm text-gray-600">+91 9876543210</p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="bg-white border rounded-xl p-6 space-y-4 shadow-sm"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <button
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
