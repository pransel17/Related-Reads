import React, { useState } from 'react';
import api from '../../../api/api';
import { Send } from 'lucide-react';

const BookCreateComment = ({ bookId, onReviewSuccess }) => {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return setError("Please share your thoughts!");

        setLoading(true);
        setError(null);

        try {
            const response = await api.post(
                `/api/review/createReview/${bookId}`,
                { text, rating: Number(rating) },
                { withCredentials: true }
            );

            setText("");
            setRating(5);
            if (onReviewSuccess) onReviewSuccess(response.data.review);
        } catch (err) {
            const msg = err.response?.data?.error;
            setError(msg === "You already reviewed this book." 
                ? "You have already shared your thoughts on this book!" 
                : (msg || "Failed to post review"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card w-full max-w-4xl bg-base-100/50 shadow-xl border border-base-200 mt-10">
            <div className="card-body">
                <h3 className="card-title text-md font-bold mb-4">Share Your Thoughts</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="alert alert-error text-sm">{error}</div>}
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold opacity-70 uppercase">Your Rating</label>
                        <div className="rating rating-sm gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <input
                                    key={num}
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={rating === num}
                                    onChange={() => setRating(num)}
                                />
                            ))}
                        </div>
                    </div>

                    <textarea 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What did you think of this book?"
                        className="textarea textarea-bordered w-full h-20 text-base"
                        required
                    />

                    <div className="card-actions justify-end">
                        <button type="submit" disabled={loading} className="bg-[#1d3d59] hover:bg-[#265073] btn px-4 rounded-full text-white">
                            {loading ? "Posting..." : <><Send className="w-4 h-4 text-white" /> Post Review</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookCreateComment;