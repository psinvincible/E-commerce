"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../orders/loading";
import { CiMail } from "react-icons/ci";

export default function AdminContactPage(){
    const [messages, setMessages] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    
    useEffect(() => {
      fetchMessages();
    }, []);

    const fetchMessages = async() => {
        try {
            const res = await fetch("/api/admin/contact");
        const data = await res.json();
        if(!res.ok) return toast.error("Fetch failed!");
        setMessages(data.messages);
        } catch (error) {
            toast.error(error.message);
        }finally {
            setPageLoading(false);
        }
    }

    const handleUpdate = async(msgId, msgIsRead) => {
        try {
            setUpdatingId(msgId);
            const res = await fetch(`/api/admin/contact`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                id: msgId,
                isRead: !msgIsRead,
            })
        })
        let data = await res.json();
        if(!res.ok){
            toast.error(data.error);
            return;
        }
        toast.success("Update Success");
        fetchMessages();
        } catch (error) {
            toast.error(error);
        }finally {
            setUpdatingId(null);
        }
        
    }

    if(pageLoading)return <Spinner />
    
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6"><CiMail /> Contact Messages</h1>

            {messages.length === 0 ? (
                <div className="text-gray-500 text-center py-20">
                    No messages yet.
                </div>
            ) : (
                <div className="space-y-4">
                {messages.map((message) => (
                    <div
                     key={message._id}
                     className={`relative border rounded-lg p-5 shadow-sm transition hover:shadow-md ${message.isRead ? "bg-gray-50" : "bg-white border-l-4 border-l-blue-500"}`}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <p className="font-semibold text-gray-900">{message.name}</p>
                                <p className="text-sm text-gray-500">{message.email}</p>
                            </div>

                            <button
                            onClick={() => handleUpdate(message._id, message.isRead)}
                            disabled={updatingId === message._id}
                            className={`text-xs font-medium px-3 py-1 rounded-full transition ${
                                message.isRead ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-700 hover:bg-red-200"
                            } ${updatingId === message._id && 'opacity-50 cursor-not-allowed'}`}

                            >
                                {updatingId === message._id ? "Updating..." : message.isRead ? "Read" : "Unread"}
                            </button>
                        </div>
                        <p className="mt-4 text-gray-700 leading-relaxed">{message.message}</p>
                        <p>{new Date(message.createdAt).toLocaleString()}</p>

                    </div>
                ))}
            </div>
            )}
            

        </div>
    )
}