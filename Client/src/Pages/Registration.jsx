import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const Registration = () => {
    const navigate=useNavigate()
    const [signDetails,setSignDetails]=useState({
       email: "",
     firstName: "",
    lastName: "",
    mobile: "",
    password: ""
    })
   
    const changeHandler=(e)=>{
      const {name,value}=e.target
      setSignDetails((prev=>({
        ...prev,
        [name]:value
      })))
    }
 const submitRegister = async (e) => {
    e.preventDefault();
    try {
        const url = 'https://task-manager-app-sigma-ruby.vercel.app/api/signup';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signDetails)
        });
        
        const result = await response.json();

        const { status, message, error } = result;
        if (status === 'success') {
            setTimeout(() => {
              toast.success(message)
              navigate('/login')
            }, 1000);
        } else {
            return toast.error(error || message || 'Registration failed');
        }
    } catch (error) {
        console.error("Network crash:", error);
    }
};
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#f9f8f8]">
  <form className="max-w-sm w-full bg-[#FFFFFF] p-6 rounded-lg shadow-md" onSubmit={submitRegister}>
  <div className="mb-4">
    <h2 className="text-xl font-bold text-[#344767]">Register New User</h2>
  </div>
  
  {/* Email Field */}
  <div className="mb-4">
    <div>
      <input 
        className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="email" 
        name="email" 
        id="email" 
        placeholder='Enter your Email' 
        value={signDetails.email} 
        onChange={changeHandler} 
        autoComplete="email"
        required
      />
    </div>
  </div>
  
  {/* First Name Field */}
  <div className="mb-4">
    <div>
      <input 
        className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="text" 
        name="firstName" 
        id="firstName" 
        placeholder='Enter your firstName' 
        value={signDetails.firstName} 
        onChange={changeHandler} 
        autoComplete="given-name"
        required
      />
    </div>
  </div>
  
  {/* Last Name Field */}
  <div className="mb-4">
    <div>
      <input 
        className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="text" 
        name="lastName" 
        id="lastName" 
        placeholder='Enter your LastName' 
        value={signDetails.lastName} 
        onChange={changeHandler} 
        autoComplete="family-name"
        required
      />
    </div>
  </div>
   
  {/* Mobile Field */}
  <div className="mb-4">
    <div>
      <input 
        className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="tel" 
        name="mobile" 
        id="mobile" 
        placeholder='Enter your Number' 
        value={signDetails.mobile} 
        onChange={changeHandler} 
        autoComplete="tel"
        required
      />
    </div>
  </div>
   
  {/* Password Field */}
  <div className="mb-4">
    <div>
      <input 
        className="w-full p-2 rounded border-gray-300 border focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="password" 
        name="password" 
        id="password" 
        placeholder='Enter your Password' 
        value={signDetails.password} 
        onChange={changeHandler} 
        autoComplete="new-password"
        required
      />
    </div>
  </div>
   
  <button type="submit" className="text-white px-4 py-2 rounded font-bold w-full bg-blue-500">Create Account</button>
  
  <div className="flex justify-end mt-6 gap-2">
    <button type="button" className='text-[#344767] text-sm font-bold' onClick={() => navigate('/login')}>Login</button> |
    <button type="button" className="text-[#344767] text-sm font-bold">Forgot Password?</button>
  </div>
</form>
</div>
    );
};

export default Registration;