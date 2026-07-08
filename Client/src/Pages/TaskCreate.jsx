import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const TaskCreate = () => {
  const navigate=useNavigate()
    const [taskInfo,setTaskInfo]=useState({
        title:"",
        description:"",
        status:"new"
    })
    const changeHandler=(e)=>{
    const {name,value}=e.target
    setTaskInfo((prev=>({
        ...prev,
        [name]:value
    })))
    }
    const submitTask=async(e)=>{
    e.preventDefault()
    try {
        if(!taskInfo.title ||!taskInfo.description ||!taskInfo.status){
        return toast.error('enter title,description or status correctly!')
        }
        const token=localStorage.getItem('token')
        if(!token){
            return toast.error('token not found!')
        }
        const url='https://task-manager-app-pi-ruby.vercel.app/api/createTask'
        const response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify(taskInfo)
        })
      const result=await response.json()
      if(result){
        navigate('/')
        toast.success(result)
      }
    } catch (error) {
        toast.error('failed to create tasks')
    }
    }
    
    return (
        <div className='w-full flex justify-center items-center bg-gray-100'>
      
      <form 
        className="flex flex-col gap-4 bg-[#FFFFFF] w-full max-w-lg p-6 rounded-lg shadow-lg shadow-md" onSubmit={submitTask}
      >
        <h2 className="text-xl font-bold text-center mb-2 ">Create New Task</h2>

        {/* Title Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-semibold">Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            placeholder='Enter your title'
            onChange={changeHandler}
            className="w-full p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-300 border border-slate-400"
            required
          />
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-semibold">Description</label>
          <textarea 
            type="text" 
            name="description" 
            id="description" 
            placeholder='Description'
            onChange={changeHandler}
            className="w-full p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-300 border border-slate-400 h-20"
            required
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm font-semibold">Status</label>
          <select 
            name="status" 
            id="status"
            onChange={changeHandler}
            className="w-full p-2 rounded text-black  focus:outline-none focus:ring-2 focus:ring-blue-300 border border-slate-400"
          >
            <option value="new">New</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancel">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="mt-2 bg-blue-600 font-bold py-2 px-4 rounded transition-colors text-white"
        >
          Add Task
        </button>
      </form>

    </div>
    );
};

export default TaskCreate;