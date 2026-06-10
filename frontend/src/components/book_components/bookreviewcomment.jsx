import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, MoreHorizontal, Star } from 'lucide-react';

const BookReviewComments = ({ review }) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!review) return null;

  // Extract variables
  const user = review.user || {};
  const date = new Date(review.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const content = review.ReviewContent || "";
  const rating = review.rating || 0;
  const likesCount = typeof review.likes === 'number' ? review.likes : 0;

  return (
    <div className="w-full max-w-4xl p-6 flex gap-6 border-b border-gray-200">
      
      {/* LEFT COLUMN: User Profile */}
      <div className="flex flex-col items-center w-32 flex-shrink-0">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mb-2">
          {user.ProfileImage ? (
            <img src={user.ProfileImage} alt={user.UserName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#244d6d] text-white font-bold">
              {user.UserName?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
        <h4 className="font-bold text-sm text-center truncate w-full">{user.UserName || "Anonymous"}</h4>
        <button className="mt-3 w-full bg-[#244d6d] text-white text-xs py-1.5 rounded-full hover:bg-opacity-90">
          Follow
        </button>
      </div>

      {/* RIGHT COLUMN: Review Content */}
      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-1">{date}</div>
        
        {/* Star Rating */}
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}`} />
          ))}
        </div>

        <p className="text-sm md:text-base text-slate-800 leading-relaxed mb-4">{content}</p>

        {/* Footer Actions */}
        <div className="flex items-center gap-6">
          <span className="text-xs text-gray-600 font-medium">{isLiked ? likesCount + 1 : likesCount} Likes</span>
          <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-2 text-xs font-semibold hover:text-gray-600">
            <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-[#244d6d] text-[#244d6d]" : ""}`} /> Like
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold hover:text-gray-600">
            <MessageSquare className="w-4 h-4" /> Comment
          </button>
          <button className="ml-auto p-1 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookReviewComments;