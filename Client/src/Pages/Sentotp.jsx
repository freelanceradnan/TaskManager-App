import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Sentotp = () => {
    const [email,setEmail]=useState("")
    const navigate=useNavigate()
    //otp sender
    const otpsender=async(e)=>{
    e.preventDefault()
    try {
    if(!email){
    return toast.error('please inter a email')
    }
    const url='https://task-manager-app-sigma-ruby.vercel.app/api/verify-Email'
    const response=await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email})
    })
    const result=await response.json()
     
    if(result.success===true){
        toast.success('Email otp sent!')
        setTimeout(() => {
        navigate('/otpverify', { state: { email: email } });
        }, 1000);
    }else {
        setEmail("")
        return toast.error('please enter a right email add and sent again')
    }
    } catch (error) {
        
    }
    }
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#f9f8f8]">
      <form
        className="max-w-sm w-full bg-[#FFFFFF] p-6 rounded-lg shadow-md flex flex-col gap-4"
        onSubmit={otpsender}
      >
        <h2>EMAIL ADDRESS</h2>
        <input 
  type="email" 
  name="email" 
  id="email" 
  className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-pink-500" 
  placeholder="Enter your Email address ..."
  required
  onChange={(e)=>setEmail(e.target.value)}
/>
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-sm uppercase text-sm font-bold">Next</button>
      </form>
    </div>
  );
};

export default Sentotp;
