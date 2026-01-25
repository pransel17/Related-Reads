import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline  } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import axios from 'axios';


const LoginPage = () => {



    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        UserName: "",
        Password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        setErrorMessage("");
        console.log(formData);
        try{
        const res = await axios.post("/api/auth/sign-in", formData)

        setTimeout(() => {
          navigate("/profile"); 
          }, 2000); 

        }

         
        catch(error){
        const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
        setErrorMessage(errorMsg);
        setIsLoading(false); 
        }
        
      }

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const isError = false;


  return (  
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-6">


      <div className="absolute top-0 left-6 flex items-center gap-3">
        <div className="w-15 h-15 rounded-full overflow-hidden border-none">
            <img 
                src="Logos/logo-1.png" 
                alt="Logo Icon" 
                className="w-full h-full object-cover border-none" />
        </div>
        <div className="w-40 h-20  overflow-hidden border-none">
          <img 
            src="Logos/logo-2.png" 
            alt="Logo Icon" 
            className="w-full h-full object-cover border-none" />
        </div>
      </div>

      
      
      <form onSubmit={handleSubmit} className="w-full max-w-md">

        <fieldset className="fieldset text-black fieldset-lg bg-[#A4C0ED] rounded-box w-full max-w-md py-10 px-4 flex flex-col items-center text-black">
        <div className="fieldset-legend flex flex-col items-center w-full mb-2">
          <h2 className="text-xl font-bold">Welcome Back</h2>
          <p className="text-sm font-normal">Login to Continue</p>
        </div>
        
  
        <label className="input bg-white rounded-[40px] flex items-center gap-2 w-full max-w-xs border-none">
          <IoPersonOutline className="text-gray-500" />
          <input 
            type="text" 
            name="UserName"
            className="grow text-black" 
            placeholder="Enter Username" 
            onChange={handleInputChange} 
            value={formData.UserName}
          />
        </label>

        <label className="input bg-white rounded-[40px] flex items-center gap-2 w-full max-w-xs border-none">
          <CiLock className="text-gray-500" />
          <input 
            type="password" 
            name="Password"
            className="grow text-black" 
            placeholder="Enter Password" 
            onChange={handleInputChange}
            value={formData.Password}
          />
        </label>

        {errorMessage && (
          <p className="text-red-600 font-bold text-xs"> {errorMessage}</p> 
        )}


        {/* no linked route with this button, i need to ensure security sa with backend pa aayusin*/}
        <button type="submit" className="btn btn-neutral bg-[#F6FFDE] mt-4 border-none rounded-[40px] w-30 mb-2">Login</button>
        <Link 
          to="/ForgotPassword" 
          className="link link-hover text-sm text-black"> Forgot Password </Link>
        </fieldset>

        <div className="flex flex-col items-center gap-1 mt-4">
          <p className="text-sm text-black"> {`New User? `}
            <Link 
              to='/signup' 
              className="text-black hover:underline hover:font-bold transition-all"> Sign up
            </Link>
          </p>
        </div>

      </form> 
    </div>
  )
}

export default LoginPage