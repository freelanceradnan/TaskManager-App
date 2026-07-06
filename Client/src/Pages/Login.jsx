import React from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate=useNavigate()
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#f9f8f8]">
  <form className="max-w-sm w-full bg-[#FFFFFF] p-6 rounded-lg shadow-md">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-[#344767]">Sign In</h2>
    </div>
    
    <div className="mb-6">
      <div><input className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400" type="email" name="email" id="email" placeholder='Enter your Email'/></div>
    </div>
    
    <div className="mb-6">
      
      <div><input className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" name="password" id="password" placeholder='Enter Your Password'/></div>
    </div>
      <button type="submit" className=" text-white px-4 py-2 rounded font-bold w-full bg-blue-500">Sign In</button>
    <div className="flex justify-end mt-6 gap-2">
      <button type="button" className='text-[#344767] text-sm font-bold' onClick={()=>navigate('/registration')}>SignUp</button> |
      <button type="button" className="text-[#344767] text-sm font-bold">Forgot Password?</button>
    </div>
  </form>
</div>
    );
};

export default Login;