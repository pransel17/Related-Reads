import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline  } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import api from '../../../api/api';



const LoginPage = () => {



    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        UserName: "",
        Password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
    
        
        try {
            const res = await api.post("/api/auth/sign-in", formData, { withCredentials: true });
            navigate(`/profile/${formData.UserName}`); 
                  } catch (error) {
            const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
            setErrorMessage(errorMsg);
        } finally {
            setIsLoading(false); 
        }
    }

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const isError = false;


return (
    <div className="relative min-h-screen w-full bg-[#F1EEE3] overflow-hidden">
      
      
      <div className="absolute top-3 left-6 flex items-center gap-3 z-20">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src="/Logos/logo-1.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="w-39 h-16 overflow-hidden">
          <img src="/Logos/logo-2.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
      </div>


      <div className="fixed bottom-0 left-2 w-[1100px] h-[620px] pointer-events-none z-0">
        <img src="/Designs/BooksBG.png" alt="Book Design" className="w-full h-auto object-contain" />
      </div>

      <div className="relative min-h-screen w-full flex items-center justify-end bg-cover bg-center bg-no-repeat z-5" 
      style={{ backgroundImage: "url('/Designs/Subtract.png')", backgroundSize: "cover", backgroundPosition: "200px center" }}>


        <div className="fixed top-0 right-0 h-screen w-[700px] z-15 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="w-full px-10 flex flex-col items-center">
           
            <div className="w-full max-w-sm flex flex-col items-center border-none p-0">

              <div className="flex flex-col items-center w-full mb-8">
                <h2 className="text-2xl font-bold text-black">Welcome Back</h2>
                <p className="text-sm font-normal text-gray-500">Login to Continue</p>
              </div>

              {/* Username */}
              <div className="relative w-full mb-6">
                <span className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-bold text-black z-10">
                  Username
                </span>
                <label className="input bg-white border border-black rounded-lg flex items-center gap-3 w-full h-12 px-4 focus-within:ring-1 focus-within:ring-black">
                  <IoPersonOutline className="text-black" />
                  <input 
                    type="text" 
                    name="UserName" 
                    className="grow text-black placeholder:text-gray-400 focus:outline-none" 
                    placeholder="Enter Username" 
                    onChange={handleInputChange} 
                    value={formData.UserName} 
                  />
                </label>
              </div>

              {/* Password */}
              <div className="relative w-full mb-2">
                <span className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-bold text-black z-10">
                  Password
                </span>
                <label className="input bg-white border border-black rounded-lg flex items-center gap-3 w-full h-12 px-4 focus-within:ring-1 focus-within:ring-black">
                  <CiLock className="text-black" />
                  <input 
                    type="password" 
                    name="Password" 
                    className="grow text-black placeholder:text-gray-400 focus:outline-none" 
                    placeholder="Enter Password" 
                    onChange={handleInputChange} 
                    value={formData.Password} 
                  />
                </label>
              </div>

              {errorMessage && <p className="text-red-600 font-bold text-xs mt-2 self-start">{errorMessage}</p>}

              <button type="submit" disabled={isLoading} className="btn btn-neutral bg-black text-white mt-6 border-none rounded-lg w-full h-12">
                {isLoading ? <span className="loading loading-spinner"></span> : "Login"}
              </button>

              <Link to="/ForgotPassword" className="link link-hover text-sm text-black mt-4">Forgot Password?</Link>
            </div>

            <p className="text-sm text-black mt-6">New User? 
              <Link to='/signup' className="font-bold hover:underline ml-1">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage