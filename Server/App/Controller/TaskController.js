// create task
import 'dotenv/config'
export async function CreateMyTask(req,res){
 try {
    res.status(200).json("user CreateTask success")
} catch (error) {
    res.status(400).json('user CreateTask failed')
}
}
//delteTask
export async function DeleteMyTask(req,res){
     try {
    res.status(200).json("user DeleteTask success")
} catch (error) {
    res.status(400).json('user DeleteTask failed')
}
}
//updateTaskStatus
export async function UpdateMyTaskStatus(req,res){
     try {
    res.status(200).json("user UpdateTaskStatus success")
} catch (error) {
    res.status(400).json('user UpdateTaskStatus failed')
}
}
//GetTasksbyStatus
export async function GetMyTasksByStatus(req,res){
     try {
    res.status(200).json("user GetTasksByStatus success")
} catch (error) {
    res.status(400).json('user GetTasksByStatus failed')
}
}
//Counttasks
export async function CountMyTasks(req,res){
     try {
    res.status(200).json("user CountTasks success")
} catch (error) {
    res.status(400).json('user CountTasks failed')
}
}
