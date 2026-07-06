import TopNavbar from "../../components/common/TopNavbar"
import SearchBooks from "../../components/home_components/SearchBooks"
import SuggestedBookCard from "../../components/home_components/SuggestedBookCard"
import api from "../../api/api"
import TrendingBooksCard from "../../components/home_components/TrendingBooksCard"
import ReadingChallengePart from "../../components/home_components/ReadingChallengeBanner"
import AdvertisementBanner from "../../components/home_components/AdvertisementBanner"
import { useEffect, useState } from "react"
import HomeFooter from "../../components/website_info/home_footer"
import HomeSkeleton from "../../components/skeletons/home_skeleton"

const HomePage = () => {
  
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true); // New state

  useEffect(()=>{
    api.get("/api/books/trendingBook")
    .then((res)=> {
      setTrendingBooks(res.data);
      setLoading(false); // Set loading to false once data is received
    })

    .catch((err) => {
      console.error(err);
      setLoading(false); // Set loading to false even if there's an error
    });

  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center">

      <TopNavbar/>     
      <div className="w-full max-w-2xl px-4 mt-3 flex justify-center">
        <SearchBooks />
      </div>



      <div className="flex flex-col md:flex-row mr-auto gap-4">
        {/* READING CHALLENGE PART */}

        <div className="ml-5">
          <ReadingChallengePart/>  
        </div>



        {/* CENTER PART */}
        <div> 
          <div className="max-w-4xl mx-auto px-4 ">

            <div className="text-sm my-1 mt-2 font-bold text-[#244d6d] text-center" > Trending Books</div>
            {/* FOR THE TRENDING BOOKS SPAN*/}
            <div className="flex flex-col gap-8">
              {/* this part of the code is for organizing the trendingbooks card so ginamit ko pa rn yung import dumami nga lang code here gawa nung need ko pa icollege like look */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-auto md:auto-rows-[100px] my-2">
                {trendingBooks.map((book, index) => {
                
                  let spanClass = "col-span-1 row-span-1"; 
                
                  if (index === 0) spanClass = "md:col-span-1 md:row-span-2";
                  if (index === 1) spanClass = "md:col-span-3 md:row-span-1";
                  if (index === 2) spanClass = "md:col-span-2 md:row-span-1";
                  if (index === 3) spanClass = "md:col-span-1 md:row-span-1";
                  if (index >= 4) spanClass = "md:col-span-2 md:row-span-1";
                
                  return (
                    <div key={book.googleBookId} className={`${spanClass} w-full`}>
                      <TrendingBooksCard 
                        id={book._id || book.googleBookId} // CHANGE: Added id prop targeting backend key
                        book={book} 
                        variant={index === 0 ? "vertical" : "horizontal"}
                      />
  
                    </div>
                  );
                })}
              </div> 
            </div>

           
           {/* FOR THE SUGGESTED BOOKS SPAN */}
            <div className="text-sm my-2 font-bold text-[#244d6d] text-center" > Suggested Books</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-items-center mt-4">
              {trendingBooks.slice(0, 6).map((book) => (
                <SuggestedBookCard 
                  key={book._id || book.googleBookId}
                  id={book._id || book.googleBookId}
                  Image={book.Image || book.coverImage} 
                  BookName={book.BookName || book.title} 
                  AuthorName={book.AuthorName || book.author} 
                />
              ))}
            </div>
           


          

          </div>
        </div>

        <div className="mr-5">
          <AdvertisementBanner/>  
        </div>


      </div>

      <HomeFooter/>
    </div>
  )
}
export default HomePage