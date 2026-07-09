import { Delete, Pen, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const NewTasks = () => {
    const [data,setData]=useState([])
    const [refetch,setRefetch]=useState(false)
    const [editModal,setEditModal]=useState(false)
    const [editId,setEditId]=useState(null)
    const [editdata,setEditData]=useState("new")
   
    useEffect(()=>{
    const getData=async()=>{
        try {
          const token=localStorage.getItem('token')
          if(!token){
            toast.success('token not found')
          }
          const url='https://task-manager-app-smoky-seven.vercel.app/api/tasks/cancel'
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
    },[refetch])
    const deleteHandler=async(id)=>{
      
      try {
        const token=localStorage.getItem('token')
        if(!token){
        return toast.error('token not found!')
        }
       const url=`https://task-manager-app-smoky-seven.vercel.app/api/deleteTask/${id}`
       const response=await fetch(url,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'authorization':token
        }
       })
       const result=await response.json()
       if(result){
        toast.success('task deleted success!')
        setData((prevTasks) => prevTasks.filter((task) => task._id !== id));
       }
       else{
        toast.error('failed to delete task')
       }
      } catch (error) {
        
      }
    }
    const submitStatus = async (e) => {
  e.preventDefault(); 
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return toast.error('Token not found!'); 
    }
    
    
    const url = `https://task-manager-app-smoky-seven.vercel.app/api/${editId}`; 
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
     
      body: JSON.stringify({ status: editdata }) 
    });
    
    const result = await response.json();
    

    if (response.ok) {
      toast.success('Task updated successfully!');
      setRefetch(!refetch)
      setEditModal(false); 
    } else {
      toast.error(result.message || 'Failed to update task');
    }

  } catch (error) {
    console.error(error);
    toast.error('Something went wrong!');
  }
};
    return (
        <div>
           <h2 className='text-2xl font-semibold uppercase py-2'>Cancel Tasks</h2>
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
      <div className='flex gap-2'>
        <button 
  className='text-red-500 hover:text-blue-500 transition-colors' 
  title="Edit Task" 
  onClick={() => {
    setEditModal(true);
    setEditId(d._id);
  }}
>
        <Pen size={15}/>
      </button>
      <button className='hover:text-blue-500 transition-colors text-red-500' title="Edit Task" onClick={()=>deleteHandler(d._id)}>
        <Trash  size={15}/>
      </button>
      </div>
    </div>
    

    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-green-400 text-white`}>
      {d.status}
    </span>

  </div>
</div>
            ))}
            </div>
{editModal &&

            <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
  <div className='bg-[#FFFFFF] w-80 rounded-lg shadow-xl p-6 flex flex-col gap-4'>
    <h2 className='uppercase'>Update task status</h2>
    <select name="" id="" className='w-full p-2 rounded text-black  focus:outline-none focus:ring-2 focus:ring-blue-300 border border-slate-400' onChange={(e)=>setEditData(e.target.value)} value={data.status}>
      <option value="new">New</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancel">Cancelled</option>
    </select>
   <form onSubmit={(e) => submitStatus(e)}>


  <button 
    type="submit" 
    className='flex justify-center bg-blue-500 w-20 mx-auto text-white font-bold uppercase py-2 rounded shadow hover:bg-blue-600 transition-colors'
  >
    OK
  </button>
</form>
  </div>
</div>
}
        </div>
    );
};

export default NewTasks;