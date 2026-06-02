import React, { useState } from 'react'

const BookAuthor = ({ bookData }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  if (!bookData) return null;

  // Extracted clean matching fields from your synchronized backend API schema
  const authorName = bookData.AuthorName || "Unknown Author";
  const authorDescription = bookData.AuthorDescription || "No biography description available.";
  const authorPhoto = bookData.AuthorPhoto || "https://placehold.co/150x150?text=No+Avatar";

  return (
    <div className="w-full max-w-4xl p-4 text-slate-800">
      <h3 className="text-xl font-bold text-slate-900 mb-6">About the Author</h3>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        
        {/* Left Side: Circular Avatar Layout */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <img 
            src={authorPhoto} // Fixed variable connection
            alt={authorName} 
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border border-slate-200/60 shadow-sm"
          />
        </div>

        {/* Right Side: Dynamic Content Info */}
        <div className="flex-1 w-full">
          
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className="text-xl md:text-2xl font-bold text-slate-900">
              {authorName}
            </h4>
            
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                isFollowing 
                  ? "bg-slate-200 text-slate-700 hover:bg-slate-300" 
                  : "bg-[#244d6d] text-white hover:bg-[#1a3850] shadow-sm"
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>


          {/* Biography Description Loop Layer */}
          <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed max-w-3xl">
            {Array.isArray(authorDescription) ? (
              authorDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>{authorDescription}</p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookAuthor;