import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const navigate=useNavigate()
    const location=useLocation()
    const [password,setPassword]=useState("")
    const {email,otp}=location.state||{}
    const changePasswordHandler=async(e)=>{
      e.preventDefault()
    try {
      if(!email || !otp){
        return toast.error('email,otp not found!')
      }
      if(!password){
        return toast.error("enter a valid password!")
      }
      
      const url='https://task-manager-app-pi-ruby.vercel.app/api/ChangePassword'
      const response=await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email,otp:otp,password:password})
      })
      const result = await response.json();

if (result.success === true) {
    
    toast.success(result.message || 'Password changed successfully!');
    
    
    navigate('/login');
} 
    } catch (error) {
      toast.error('failed to change password')
    }
    }
    return (
        <div>
            <div className="h-screen w-full flex flex-col justify-center items-center bg-[#f9f8f8]">
      <form
        className="max-w-sm w-full bg-[#FFFFFF] p-6 rounded-lg shadow-md flex flex-col gap-4"
        onSubmit={changePasswordHandler}
      >
        <h2>Enter A new Password</h2>
        <input 
  type="password" 
  name="email" 
  id="email" 
  className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-pink-500" 
  placeholder="Enter your Email address ..."
  required
  onChange={(e)=>setPassword(e.target.value)}
/>
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-sm uppercase text-sm font-bold">ChangePassword</button>
      </form>
    </div>
        </div>
    );
};

export default ChangePassword;