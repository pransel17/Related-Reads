import TopNavbar from "../../components/common/topnavbar"
import SearchBooks from "../../components/home_components/searchBooks"
import { Axios } from "axios"

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#E4D8B4]">

         <TopNavbar/>
        
         <div className="w-full max-w-2xl px-4 mt-4 flex justify-center">
          <SearchBooks />
        </div>

        
    </div>
  )
}
export default HomePage