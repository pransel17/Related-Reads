import React from 'react';
import { Link } from 'react-router-dom';


const SuggestedBookCard = ({ id, Image, BookName, AuthorName }) => {
  return (

    <Link 
      to={`/book/${id}`} 
      className="relative w-full aspect-[2/3] max-w-[240px] rounded-[24px] shadow-lg overflow-hidden group bg-base-200 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block"
    >
      
      <figure className="w-full h-full">
        <img
          src={Image || "https://placehold.co/400x600?text=No+Cover"}
          alt={BookName}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </figure>

      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
        <h2 className="text-sm md:text-base font-bold leading-tight line-clamp-2">
          {BookName}
        </h2>
        <p className="text-xs text-gray-300 mt-0.5 line-clamp-1">
          {AuthorName}
        </p>
        
        <div className="flex text-amber-400 text-xs mt-2">
          ★★★★☆
        </div>
      </div>
      
    </Link>
  );
};

export default SuggestedBookCard;