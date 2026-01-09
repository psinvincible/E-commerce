"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews/${productId}`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async () => {
    if (!comment) {
      toast.error("Write a review!");
      return;
    }

    try {
        const res = await fetch(`/api/reviews/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, comment }),
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error( data.error || "Something went wrong!");
      return;
    }

    toast.success("Review Added");
    setReviews([]);
    fetchReviews();
    } catch (error) {
        toast.error("Error:", error);
        return;
    }
    
  };
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Customers Reviews</h2>

      <div className="border-p-4 rounded md-6">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 mb-2"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n}⭐
            </option>
          ))}
        </select>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please write your review..."
          className="w-full border p-2 rounded"
        ></textarea>
        <button
          onClick={submitReview}
          className="mt-2 bg-black text-white px-4 py-2 rounded mb-2"
        >
          Add review
        </button>
      </div>
      <hr />
      {reviews.length === 0 && <p className="text-gray-500">No reviews yet!</p>}
      {reviews.map((review) => (
        <div key={review._id} className="border border-gray-600 border-bold py-3 m-6">
          <p className="font-medium border border-cyan-300 text-2xl inline rounded mx-2 p-1 bg-blue-200">{review.userId?.name}</p>
          <p className="text-gray-500 text-sm mx-2">Ratings: {review.rating}⭐</p>
          <p className="mx-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
