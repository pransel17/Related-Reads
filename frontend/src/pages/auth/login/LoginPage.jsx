import { use } from "react"
import { useState } from "react"


const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData); // issend niya sa yung value when submit
    }

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const isError = false;


  return ( // here irrender yung html
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-6">
        
        <fieldset className="fieldset fieldset-lg bg-[#A4C0ED] rounded-box w-full max-w-md p-4 flex flex-col items-center">
        <legend className="fieldset-legend flex flex-col items-center w-full">
          <span className="text-xl font-normal">Welcome Back</span>
          <span className="text-sm font-bold">Login to Continue</span>
        </legend>

          <input type="email" className="input bg-white rounded-[40px]" placeholder="Email" />
          <input type="password" className="input bg-white rounded-[40px]" placeholder="Password" />

          <button className="btn btn-neutral mt-4 rounded-[40px] w-30">Login</button>
          <a href="/ForgotPassword" className="link link-hover text-sm "> Forgot Password</a>
        </fieldset>





    </div>
  )
}

export default LoginPage