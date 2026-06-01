import React from 'react'

const Bookmetadata = ({ book }) => {
    if (!book) return null;
  return (
    <div className="bg-white/50 p-4 rounded-xl border border-white/40 space-y-2 text-sm">
        
        <h3 className="font-bold text-[#244d6d] text-base mb-3">Product Details</h3>
        <div className="grid grid-cols-2 gap-y-2">
          <span className="text-gray-500 font-medium">Format:</span>
          <span className="font-semibold">{book.NumOfPages || 0} Pages, Hardcover</span>

          <span className="text-gray-500 font-medium">Published:</span>
          <span className="font-semibold">
            {book.PublicationDate ? new Date(book.PublicationDate).toLocaleDateString() : 'N/A'}
          </span>

          <span className="text-gray-500 font-medium">Language:</span>
          <span className="font-semibold">{book.Language || 'English'}</span>
        </div>
    </div>
   
  )
}

export default Bookmetadata