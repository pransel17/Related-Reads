import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import axios from "axios";  
=======
import api from "../../api/api";  
>>>>>>> feature/search-fix
import TopNavbar from "../../components/common/TopNavbar";
import ProfileCard from "../../components/profile_components/ProfileCard";

const ProfilePage = () => {
  const { UserName } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {

      try {
        setLoading(true);
        

        const response = await api.get(`/api/user/MyProfile/${UserName}`, {
          withCredentials: true 
        });

        //console.log(" Response Status", response.status);
        //console.log("JSON Received via Axios", response.data);

        
        setUser(response.data.user || response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message;
        //console.error("Fetch Error", errorMessage);
        setError(errorMessage);
        
        if (err.response?.status === 401) {
            console.warn("Unauthorized: Ensure your backend CORS allows credentials.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (UserName) {
      fetchProfileData();
    }
  }, [UserName]);

  if (loading) return <div className="p-10 text-center font-bold text-[#244d6d]">Checking API</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      <TopNavbar />
      <ProfileCard user={user} />
    </div>
  );
};

export default ProfilePage;
