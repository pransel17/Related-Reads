import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-react';


const BookReviewComments = ({ review }) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!review) return null;

  const formatDate = (isoString) => {
    if (!isoString) return "Month DD, YYYY";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  const date = formatDate(review.createdAt);
  const reviewContent = review.ReviewContent || "";
  const likesCount = review.likes?.length || 54; 

  const paragraphs = typeof reviewContent === "string" 
    ? reviewContent.split("\n\n").filter(p => p.trim() !== "")
    : [];

  return (
    <div className="w-full max-w-4xl p-6 text-slate-800 font-sans">
      

      <div className="text-xs text-gray-500 mb-6 tracking-wide">
        {date}
      </div>


      <div className="space-y-5 text-sm md:text-base text-slate-800 leading-relaxed max-w-4xl pr-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))
        ) : (
          <p className="italic text-gray-400">No review content provided.</p>
        )}
      </div>


      <div className="flex items-center gap-6 mt-8 pt-2 select-none">
        <span className="text-xs md:text-sm text-gray-600 font-medium">
          {isLiked ? likesCount + 1 : likesCount} Likes
        </span>

        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`flex items-center gap-2 text-xs md:text-sm font-semibold transition-colors duration-200 ${
            isLiked ? "text-[#244d6d]" : "text-slate-900 hover:text-gray-600"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-[#244d6d]" : ""}`} />
          <span>Like</span>
        </button>

        <button className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-900 hover:text-gray-600 transition-colors duration-200">
          <MessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </button>

        <button className="w-8 h-8 rounded-full border border-slate-950 flex items-center justify-center hover:bg-slate-100 transition-colors duration-150 ml-2">
          <MoreHorizontal className="w-5 h-5 text-slate-900" />
        </button>
      </div>
    </div>
  );
};

export default BookReviewComments;