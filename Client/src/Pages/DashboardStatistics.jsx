import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DashboardStatistics = () => {
    const [data,setdata]=useState([])
    useState(()=>{
    const getData=async()=>{
        try {
            const token=localStorage.getItem('token')
            if(!token){
            return toast.error('token not found!')
            }
            const url='http://localhost:3000/api/countTask'
            const response=await fetch(url,{
            method:'GET',
            headers:{
                'authorization':token
            }
            })
            const result=await response.json()
           setdata(result.data)
            
        } catch (error) {
            
        }
    }
    getData()
    },[])
    return (
        <div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {data.map((d)=>(
                  <div className='shadow-md h-25 rounded-sm p-4 bg-[#FFFFFF]' key={d._id}>
                    <h2 className='text-2xl uppercase'>{d._id}</h2>
                    <h2>{d.sum}</h2>
                  </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStatistics;