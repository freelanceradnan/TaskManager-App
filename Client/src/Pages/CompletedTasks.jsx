import { Pen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CompletedTask = () => {
    const [data,setData]=useState([])
    useEffect(()=>{
    const getData=async()=>{
        try {
          const token=localStorage.getItem('token')
          if(!token){
            toast.success('token not found')
          }
          const url='http://localhost:3000/api/tasks/completed'
          const response=await fetch(url,{
            method:'GET',
            headers:{
                'authorization':token
            }
          })
          const result=await response.json()
         setData(result.data)
        } catch (error) {
        toast.error('failed to get data')
        }
    }
    getData()
    },[])
    return (
        <div>
           
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {data?.map((d)=>(
                <div key={d._id} className='rounded-lg bg-white shadow-md border border-gray-100 flex flex-col p-4 justify-between gap-3 hover:shadow-lg transition-shadow'>
  

  <div>
    {/* Title */}
    <h3 className='font-bold text-gray-800 text-lg line-clamp-1'>{d.title}</h3>
    

    <p className='text-sm text-gray-500 mt-1 line-clamp-2'>{d.description}</p>
  </div>
  

  <div className='flex justify-between items-center pt-2 border-t border-gray-50 mt-2'>
    
    
    <div className='flex gap-1.5 items-center text-xs text-gray-400'>
      <span>{new Date(d.createdAt).toLocaleDateString()}</span>
      <button className='hover:text-blue-500 transition-colors' title="Edit Task">
        <Pen size={12}/>
      </button>
    </div>
    

    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-500 text-white`}>
      {d.status}
    </span>

  </div>
</div>
            ))}
            </div>
        </div>
    );
};

export default CompletedTask;