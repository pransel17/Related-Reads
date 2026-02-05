import { useState } from "react"
import { MdOutlineEdit } from "react-icons/md";
import EditProfileModal from "./EditProfileModal";




const ProfileCard = ({user}) => {



  const avatarImage = user?.ProfileImage || "https://img.daisyui.com/images/profile/demo/batperson@192.webp";
  const NotSpecified = "Not specified"
  
  //  modal for edit profile
  const handleOpenModal = () => {
    const modal = document.getElementById('edit_profile_modal');
    if (modal) {
      modal.showModal();  
    }
  };




  

  return (
    <div className="w-full max-w-[900px] mx-auto mt-3">

      <EditProfileModal user={user} />
      <div className="flex justify-between items-center mb-3 px-4">
        <div className="w-32"></div> 
        
        <h1 className="text-xl font-bold text-[#244d6d]">Profile</h1>
        
        <button className="flex items-center gap-2 bg-[#244d6d] text-white px-4 py-2 rounded-full hover:bg-[#1d3e57] transition-all shadow-md text-sm font-semibold"
                onClick={handleOpenModal}>
          Edit Profile
          <MdOutlineEdit />
        </button>
      
      </div>

      
    
      <div className="card w-full min-h-[300px] bg-base-100 shadow-sm border border-base-300 ">
        <div className="card-body flex-col md:flex-row items-start justify-start gap-12">

        <div className="flex flex-col items-left w-full max-w-[150px]">
          <div className="avatar">
            <div className="w-40 rounded">
              <img src={avatarImage} alt="User Avatar" />
            </div>
          </div>
          <h3 className="font-bold text-lg mt-2">{user?.bio || "Bio" }</h3>
          <p className="text-sm text-gray-600">{user?.Gender || "Gender" }, {user?.CityAndCountry || "City, Country"}</p>
          <p className="text-sm text-gray-600">{user?.Birthday || "Birthday"}</p>

        </div>


        {/* RIGHT COLUMN: USERNAME & SHELVES */}
        <div className="Column2 flex-1 w-full max-w-[300px] md:text-left">
          <h2 className="text-2xl font-bold mb-4">{user?.UserName || NotSpecified}</h2>
          
          <div className="bg-[#244d6d] w-20 h-12 rounded-lg flex flex-col justify-center items-center shadow-inner">
             <p className="text-xl font-bold text-white">{user?.Read?.length || 0}</p>
             <p className="text-[10px] text-white uppercase">Books</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">Details</h3>
            <p className="text-xs text-gray-500 italic">Joined in Month DD YEAR</p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold">Favorite GENRES</h3>
            <p className="text-xs text-gray-500 italic">{user?.FavGenres || NotSpecified}</p>
          </div>

          <div className="space-y-1">
            <h2 className="font-bold">My BookShelves</h2>
            <div className="flex flex-row gap-4 mt-6">
              {/* READ */}
              <div className="flex flex-col items-center justify-center bg-[#244d6d] text-white w-32 h-13 py-3 rounded-xl shadow-md hover:bg-[#1d3e57] cursor-pointer transition-colors">
                <span className="text-xs">Read</span>
                <span className="text-xs opacity-80">{user?.Read?.length || 0}</span>
              </div>

              {/* CURRENTLY READING */}
              <div className="flex flex-col items-center justify-center bg-[#244d6d] text-white w-32 h-13 py-3 rounded-xl shadow-md hover:bg-[#1d3e57] cursor-pointer transition-colors">
                <span className="text-xs text-center">Currently Reading</span>
                <span className="text-xs opacity-80">{user?.CurrentlyReading?.length || 0}</span>
              </div>

              {/* TO READ SHELF */}
              <div className="flex flex-col items-center justify-center bg-[#244d6d] text-white w-32 h-13 py-3 rounded-xl shadow-md hover:bg-[#1d3e57] cursor-pointer transition-colors">
                <span className="text-sm">To Read</span>
                <span className="text-xs opacity-80">{user?.ToRead?.length || 0}</span>
              </div>
            </div>

          </div>
        </div>


          

        </div>    
      </div>
    </div>

  )
}

export default ProfileCard