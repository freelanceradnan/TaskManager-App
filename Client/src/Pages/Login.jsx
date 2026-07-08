import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const LoginHandler=async(e)=>{
    e.preventDefault()
   try {
    const url='https://task-manager-app-beige-chi.vercel.app/api/login'
    const response=await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(loginInfo)
    })
    const result=await response.json()
    const {message,success,token}=result
    if(success===true){
    setTimeout(() => {
      localStorage.setItem('token',result.data.token)
      toast.success(message)
      navigate('/')
    }, 1000);
    }
    else{
      toast.error(message)
    }
   } catch (error) {
    
   }
  }
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#f9f8f8]">
      <form className="max-w-sm w-full bg-[#FFFFFF] p-6 rounded-lg shadow-md" onSubmit={LoginHandler}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#344767]">Sign In</h2>
        </div>

        <div className="mb-4">
          <div>
            <input
              className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              autoComplete="email"
              value={loginInfo.email}
              onChange={changeHandler}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <input
              className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              id="password"
              onChange={changeHandler}
              value={loginInfo.password}
              placeholder="Enter your Password"
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className=" text-white px-4 py-2 rounded font-bold w-full bg-blue-500"
        >
          Log In
        </button>
        <div className="flex justify-end mt-6 gap-2">
          <button
            type="button"
            className="text-[#344767] text-sm font-bold"
            onClick={() => navigate("/signup")}
          >
            Sign In
          </button>{" "}
          |
          <button type="button" className="text-[#344767] text-sm font-bold" onClick={()=>navigate('/sentOtp')}>
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
