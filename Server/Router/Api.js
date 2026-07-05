import express from "express";
import * as UserController from '../App/Controller/UserController.js'
import * as TaskController from '../App/Controller/TaskController.js'
const router=express.Router()
//user
router.post('/registration',UserController.MyRegistration)
router.post('/login',UserController.MyLogin)
router.get('/getProfile',UserController.GetMyProfile)
router.patch('/updateProfile',UserController.UpdateMyProfile)
router.post('/verify-Email',UserController.VerifyMyEmail)
router.post('/verify-otp',UserController.VerifyMyOtp)
router.post('/ChangePassword',UserController.ChangeMyPassword)

//task
router.post('/createTask',TaskController.CreateMyTask)
router.delete('/deleteTask',TaskController.DeleteMyTask)
router.patch('/updateTask',TaskController.UpdateMyTaskStatus)
router.get('/getTasks',TaskController.GetMyTasksByStatus)
router.post('/countTask',TaskController.CountMyTasks)

export default router