import TopNavbar from "../../components/common/topnavbar"
import SearchBooks from "../../components/home_components/searchBooks"
import SuggestedBookCard from "../../components/home_components/SuggestedBookCard"
import axios from "axios"
import TrendingBooksCard from "../../components/home_components/TrendingBooksCard"
import ReadingChallengePart from "../../components/home_components/ReadingChallengePart"
import { useEffect, useState } from "react"

const HomePage = () => {
  
  const [trendingBooks, setTrendingBooks] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:2001/api/books/trendingBook")
    .then((res)=> setTrendingBooks(res.data))
    .catch((err) => console.error(err)) 

  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center bg-[#E4D8B4]">

      <TopNavbar/>     
      <div className="w-full max-w-2xl px-4 mt-4 flex justify-center">
        <SearchBooks />
      </div>



      <div className="flex flex-col md:flex-row mr-auto gap-4">
        {/* READING CHALLENGE PART */}

        <div className="ml-5">
          <ReadingChallengePart/>  
        </div>



        {/* CENTER PART */}
        <div> 

          <div className="max-w-4xl mx-auto px-4">

          <div className="text-sm my-3 font-bold text-[#244d6d] text-center" > Trending Books</div>

          <div className="flex flex-col gap-8">

            {/* FOR THE TRENDING BOOKS */}
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
                      book={book} 
                      variant={index === 0 ? "vertical" : "horizontal"} 
                    />
                  </div>
                );
              })}
            </div> 

          </div>
          </div>

        </div>


      </div>
    </div>
  )
}
export default HomePage