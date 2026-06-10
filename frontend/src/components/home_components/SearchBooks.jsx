import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchBooks = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      // Only fetch after user types more than 2 characters
      if (query.length > 2) {
        try {
          const res = await axios.get(`http://localhost:2001/api/books/searchExternalBooks?q=${query}`);
          setResults(res.data.books || []);
          setIsOpen(true);
        } catch (err) {
          console.error("Search failed:", err);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    // Debounce to prevent too many API calls
    const delayDebounce = setTimeout(fetchBooks, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative">
      {/* DaisyUI Search Input */}
      <label className="input input-bordered bg-stone-200 w-[450px] max-w-[90vw] rounded-full flex items-center gap-2">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input 
          type="search" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..." 
        />
      </label>

      {/* DaisyUI Dropdown Preview */}
      {isOpen && results.length > 0 && (
        <ul className="absolute top-14 left-0 w-full bg-base-100 shadow-xl rounded-box z-[999] border border-gray-100 p-2">
          {results.slice(0, 5).map((book) => (
            <li key={book.googleBookId} className="hover:bg-base-200 rounded-lg transition">
              <Link to={`/book/${book.googleBookId}`} className="flex items-center gap-3 p-2">
                <img src={book.thumbnail} alt={book.title} className="w-10 h-14 object-cover rounded" />
                <div>
                  <div className="text-sm font-semibold truncate w-48">{book.title}</div>
                  <div className="text-xs opacity-70">{book.authors?.join(", ")}</div>
                </div>
              </Link>
            </li>
          ))}
          <li className="text-center p-2 border-t mt-2">
            <button className="text-sm text-primary font-semibold">See all results for "{query}"</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchBooks;