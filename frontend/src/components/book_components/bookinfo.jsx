import React from 'react';

const BookInfo = ({ book }) => {
  if (!book) return null;

  return (
    <div className="md:col-span-2 space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-[#244d6d]">{book.BookName}</h1>
        <p className="text-xl font-medium text-gray-600 mt-1">by {book.AuthorName}</p>
        

        <div className="flex items-center space-x-2 mt-2">
          <span className="text-amber-500 font-bold">★ {book.AverageRating || "0.0"}</span>
          <span className="text-sm text-gray-500">({book.NumOfReviews || 0} Reviews)</span>
        </div>
      </div>

      <hr className="border-gray-300" />


      <div className="prose max-w-none text-gray-700 leading-relaxed">
        {book.Description ? (
          <div dangerouslySetInnerHTML={{ __html: book.Description }} />
        ) : (
          <p className="italic text-gray-500">No description provided for this edition.</p>
        )}
      </div>

    
      
    </div>
  );
};

export default BookInfo;