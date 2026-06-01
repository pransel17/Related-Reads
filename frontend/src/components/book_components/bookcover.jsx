import React from 'react'

const Bookcover = ({book}) => {
  return (
    <div className="w-64 h-96 bg-gray-300 rounded-lg shadow-xl overflow-hidden flex items-center justify-center">
        {book.Image ? (
          <img src={book.Image} alt={book.BookName} className="w-full h-full object-cover" />
        ) : ( <span className="text-gray-500 italic">No Cover Available</span>
        )}
    </div>
  )
}

export default Bookcover