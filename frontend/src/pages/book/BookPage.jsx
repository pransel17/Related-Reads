import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopNavbar from "../../components/common/TopNavbar";
import BookInfo from "../../components/book_components/bookinfo";
import Bookmetadata from "../../components/book_components/bookmetadata";
import Bookcover from "../../components/book_components/bookcover";
import Bookauthor from "../../components/book_components/bookauthor";
import Bookreviewuser from "../../components/book_components/bookreviewuser";
import BookCreateComment from "../../components/book_components/bookcreatecomment";
import BookReviewComments from "../../components/book_components/bookreviewcomment";


const BookPage = () => {

  const { id } = useParams();


  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    let isMounted = true; 
    setLoading(true);

    axios.get(`http://localhost:2001/api/books/bookPreview/${id}`)
      .then((res) => {
        if (isMounted) {

          setBook(res.data.book);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching book profile:", err);
          setError(err.response?.data?.message || "Failed to load book data.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; 
    };
  }, [id]); 


  useEffect(() => {
      if (id) {
        // ADD { withCredentials: true } HERE
        axios.get(`http://localhost:2001/api/review/getReviews/${id}`, {
          withCredentials: true 
        })
          .then((res) => {
            setReviews(res.data.reviews); 
          })
          .catch((err) => {
            console.error("Error fetching reviews:", err);
            // Optional: handle unauthorized specifically
            if (err.response?.status === 401) {
              console.log("Please log in to view reviews");
            }
          });
      }
  }, [id]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E4D8B4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#244d6d]"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#E4D8B4] text-[#244d6d]">
        <h2 className="text-xl font-bold mb-2">Oops! Something went wrong.</h2>
        <p>{error || "We couldn't find the book you are looking for."}</p>
      </div>
    );
  }




  return (
    <div className="min-h-screen w-full text-gray-800 font-sans">
      
      <TopNavbar />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 p-4 mt-4">
    
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center md:items-end space-y-4 flex-shrink-0 w-48">

          <Bookcover book={book} />  
          
          <button className="w-64 bg-[#244d6d] text-white py-2 px-4 rounded font-medium hover:bg-opacity-90 transition">
            Currently Reading
          </button>
          <button className="w-64 bg-white border border-gray-300 py-2 px-4 rounded font-medium shadow-sm hover:bg-gray-50 transition">
            Want to Read
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full space-y-6">
          <BookInfo book={book} />
          <Bookmetadata book={book} />
          <Bookauthor bookData={book} />
        
          <BookCreateComment 
            bookId={book.id || book._id} 
            onReviewSuccess={(newReview) => setReviews([newReview, ...reviews])}
          />
         


          <div className="mt-8 px-4 md:px-0">
            <h3 className="text-lg font-bold mb-4">Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <BookReviewComments key={rev._id} review={rev} />
              ))
            ) : (
              <p>No reviews yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookPage;