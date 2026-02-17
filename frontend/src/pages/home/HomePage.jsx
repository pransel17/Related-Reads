import TopNavbar from "../../components/common/topnavbar"
import SearchBooks from "../../components/home_components/searchBooks"
import SuggestedBookCard from "../../components/home_components/SuggestedBookCard"
import axios from "axios"
import TrendingBooksCard from "../../components/home_components/TrendingBooksCard"
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
      
      <div className="text-sm my-3 font-bold text-[#244d6d]" > Trending Books</div>

      <div className="flex flex-col gap-8">
        {/* FOR THE TRENDING BOOKS */}
        <div className="grid grid-cols-2 my-2 md:grid-cols-4 gap-3 auto-rows-[110px]">
          {trendingBooks.map((book, index) => {
            let spanClass = "col-span-1 row-span-2";  
          
            if (index === 1) spanClass = "col-span-3 row-span-1";  
            if (index === 2) spanClass = "col-span-2 row-span-1";  
            if (index === 3) spanClass = "col-span-1 row-span-1"; 
            if (index >= 4) spanClass = "col-span-2 row-span-1";   
          
            return (
              <div key={book.googleBookId} className={spanClass}>
                <TrendingBooksCard book={book} variant={index === 0 ? "vertical" : "horizontal"} />
              </div>
            );
          })}
        </div>  

        <div>

        </div>

      </div>


    </div>
  )
}
export default HomePage