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