// create task
import "dotenv/config";
import {
    CountMyTask,
  CreateTask,
  DeleteTask,
  GetTasksByStatus,
  UpdateTask,
} from "../Services/TaskService.js";
export async function CreateMyTask(req, res) {
  const user_id = req.headers["user_id"];
  const { title, description, status } = req.body;
  try {
    if (!user_id) {
      return res.status(400).json("userid not found!");
    }
    if (!title || !description || !status) {
      return res.status(400).json("title,description,status missing!");
    }
    const result = await CreateTask(user_id, title, description, status);
    if (!result.success) {
      return res.status(400).json(result.message || "failed to create tasks");
    }
    res.status(200).json("user CreateTask success");
  } catch (error) {
    res.status(400).json("user CreateTask failed");
  }
}
//delteTask
export async function DeleteMyTask(req, res) {
  const user_id = req.headers["user_id"];
  const task_id = req.params.id;
  try {
    if (!user_id) {
      return res.status(400).json("user not found!");
    }
    if (!task_id) {
      return res.status(200).json("tasks id not found!");
    }
    const result = await DeleteTask(user_id, task_id);
    if (!result.success) {
      return res.status(400).json(result.message || "tasks delete failed");
    }
    return res.status(200).json(result.message || "tasks delete success");
  } catch (error) {
    res.status(400).json("task DeleteTask failed");
  }
}
//updateTaskStatus
export async function UpdateMyTaskStatus(req, res) {
  const user_id = req.headers["user_id"];
  const task_id = req.params.id;
  const {title,description,status}=req.body
  try {
    
    if (!task_id) {
      return res.status(200).json("tasks id not found!");
    }
    
    const result=await UpdateTask(task_id,title,description,status)
    if(!result.success){
    return res.status(400).json("tasks not updated")
    }
    res.status(200).json("user UpdateTaskStatus success");
  } catch (error) {
    res.status(400).json("user UpdateTaskStatus failed");
  }
}
//GetTasksbyStatus
export async function GetMyTasksByStatus(req, res) {
  const status = req.params.status;
  const user_id = req.headers["user_id"];

  try {
    if (!status) {
      return res.status(400).json({ error: "status not found!" });
    }
    if (!user_id) {
      return res.status(400).json({ error: "user id not found!" });
    }

    const result = await GetTasksByStatus(user_id, status);

    if (!result.success) {
      return res
        .status(404)
        .json({ error: result.message || "tasks not found!" });
    }

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      data: result.message,
    });
  } catch (error) {
    console.error("Error in GetMyTasksByStatus:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

//Counttasks
export async function CountTasks(req, res) {
    const user_id = req.headers['user_id'];
    
    try {
        if (!user_id) {
            return res.status(400).json({ error: "User ID not found in headers!" });
        }
        
        const result = await CountMyTask(user_id);
        
        if (!result.success) {
            return res.status(404).json({ error: result.message });
        }
        
        return res.status(200).json({
            message: "Task counts retrieved successfully",
            data: result.message
        });

    } catch (error) {
        console.error("Error in CountTasks controller:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
