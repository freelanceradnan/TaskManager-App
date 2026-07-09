import React, { useState, useRef } from 'react'; // ১. useState এবং useRef ইমপোর্ট করা হয়েছে
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Otpverify = () => {
    const location=useLocation();
    const navigate=useNavigate()
    const { email } = location.state || {};
    console.log(email)
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);


    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
   const submitOtp=async(e)=>{
    e.preventDefault()
  try {
    const  enteredOtp= otp.join(""); 

if (enteredOtp.length < 6) {
    return toast.error('Enter 6 digits code!')
}

const url='https://task-manager-app-smoky-seven.vercel.app/api/verify-otp'
const response=await fetch(url,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({email:email,otp:enteredOtp})
})
const result=await response.json()
if(result.success===true){
    navigate('/changepassword', { state: { email: email, otp: enteredOtp } });
    toast.success('otp verify success!')

}
else{
    toast.error('otp verify failed please recheck otp!')
}
  } catch (error) {
    
  }
   }
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#F9F8F8]">
   <form action="" className='max-w-sm p-10 bg-[#FFFFFF]  shadow-md flex flex-col gap-4' onSubmit={submitOtp}>
     <h2 className='text-center uppercase py-2 font-bold'>Enter your otp</h2>
      <div className='flex gap-2 justify-center items-center'>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text" 
            inputMode="numeric"
            ref={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className='w-12 h-12 text-center border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none font-semibold text-lg transition-colors'
          />
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 rounded-sm uppercase text-sm font-bold w-full">Next</button>
   </form>
    </div>
  );
}; 

export default Otpverify;