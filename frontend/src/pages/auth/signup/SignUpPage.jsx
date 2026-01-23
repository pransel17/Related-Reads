import { useState } from 'react'
import { IoPersonOutline  } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail } from "react-icons/ai";
import axios from 'axios';

const SignUpPage = () => {

    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        UserName: "",
        Email: "",
        Password: "",
    })

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            //Send data to the backend
            // Vite proxy handles the 'http://localhost:2001' part
            // always check the route,, hhahahah
            const res = await axios.post("/api/auth/sign-up", formData);
            
            console.log("Success:", res.data);
            setIsSuccess(true); // Trigger the success UI
            setTimeout(() => {
              navigate("/login"); 
            }, 2000); // Wait for 2000ms (2 seconds)

        } catch (err) {
            // Capture backend errors 
            const errorMsg = err.response?.data?.error || "Signup failed. Try again.";
            setErrorMessage(errorMsg);
            console.error("Signup error:", errorMsg);
        } finally {
            setIsLoading(false);
        }


    }

    const handleInputChange = (e) => { // universal function that update any field in form without needing a separate function for the name, email, and password
        setFormData({ ...formData,[e.target.name]: e.target.value})
    }

	const isError = false;

  return (
    <div  className="min-h-screen flex items-center justify-center bg-base-100 p-6">
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
  
          <fieldset className="fieldset text-black fieldset-lg bg-[#A4C0ED] rounded-box w-full max-w-md py-8 px-4 flex flex-col items-center text-black">
          <div className="fieldset-legend flex flex-col items-center w-full mb-2">
            <h2 className="text-xl font-bold">Welcome to Related Reads!</h2>
            <p className="text-sm font-normal">Sign Up to Continue</p>
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
            <AiOutlineMail  className="text-gray-500" />
            <input 
              type="email" 
              name="Email"
              className="grow text-black" 
              placeholder="Enter Email" 
              onChange={handleInputChange}
              value={formData.Email}
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

          {isSuccess && (
          <div className="flex flex-col items-center gap-2 text-green-700 font-bold mb-2">
              <p>Signup Successful! Redirecting...</p>
              <span className="loading loading-bars loading-sm"></span>
          </div>
           )}


          {errorMessage && (
          <p className="text-red-600 font-bold text-xs"> {errorMessage}</p> 
          )}
  
  
          <button type="submit" className="btn btn-neutral bg-[#F6FFDE] mt-4 border-none rounded-[40px] w-30 mb-2">Sign Up</button>
          </fieldset>
  
          <div className="flex flex-col items-center gap-1 mt-4">
            <p className="text-sm text-black"> {`Already have an account? `}
              <Link 
                to='/login' 
                className="text-black hover:underline hover:font-bold transition-all"> Login
              </Link>
            </p>
          </div>

      </form> 




    </div>
  )
}

export default SignUpPage