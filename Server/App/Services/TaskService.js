import tasks from "../Models/TaskModel.js"

export async function CreateTask(user_id,title,description,status){
    try {
    const result = await tasks.create({
            user_id,
            title,
            description,
            status
        }); 
    return { 
            success: true, 
            message: "Task created successfully!", 
            data: result 
        };
   
    } catch (error) {
       return {success:false,message:"tasks creation failed!"} 
    }

}
export async function GetTasksByStatus(user_id, status) {
    try {
        const isExistsTask = await tasks.find({ user_id: user_id, status: status });
        
        if (!isExistsTask || isExistsTask.length === 0) {
            return { success: false, message: "tasks not found!" };
        }
        return { success: true, message: isExistsTask };
    } catch (error) {
        console.error("Database error in GetTasksByStatus:", error);
        return { success: false, message: "Database query failed" };
    }
}
export async function DeleteTask(user_id,task_id){
try {
    const result=await tasks.deleteOne({_id:task_id,user_id:user_id})

    return {success:true,message:"task deleted success"}
} catch (error) {
     return {success:false,message:"task deleted failed"}
}
}
export async function UpdateTask(task_id,user_id,title,description,status){
   
try {
    
     const result=await tasks.updateOne({_id:task_id,user_id:user_id},{
        $set:{
            title,
            description,
            status
        }
     })
    if(!result){
    return {success:false,message:result.message||"tasks update failed"}
    }
    return {success:true,message:"tasks update success!"}
} catch (error) {
    return {success:false,message:"tasks update failed"}
}
}
import mongoose from 'mongoose';

export async function CountMyTask(user_id) {
    try {
        const result = await tasks.aggregate([
            { 
                $match: { 
                    user_id: new mongoose.Types.ObjectId(user_id) 
                } 
            },
            { 
                $group: {
                    _id: '$status',      
                    sum: { $sum: 1 } 
                } 
            }
        ]);
        if (!result || result.length === 0) {
            return { success: false, message: 'No tasks found for this user' };
        }

        return { success: true, message: result };

    } catch (error) {
        return { success: false, message: 'An error occurred while counting tasks' };
    }
}