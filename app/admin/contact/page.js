"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../orders/loading";

export default function AdminContactPage(){
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      fetchMessages();
    }, []);

    const fetchMessages = async() => {
        const res = await fetch("/api/admin/contact");
        const data = await res.json();
        if(!res.ok) return toast.error("Fetch failed!");
        setMessages(data.messages);
        setLoading(false);
    }

    if(loading)return <Spinner />

    if(!messages) return <p className="min-h-screen text-center">No message found!</p>;
    
    return (
        <div className="p-6">
            <div className="text-2xl font-bold mb-6">Contact Messages</div>

            <div className="space-y-4">
                {messages.map((message) => (
                    <div key={message._id} className="border rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{message.name}</p>
                                <p className="text-sm text-gray-600">{message.email}</p>
                                <p></p>
                            </div>
                            <span>{new Date(message.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="mt-3 text-gray-700">{message.message}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}