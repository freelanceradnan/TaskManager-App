import express from "express";
import * as UserController from '../App/Controller/UserController.js'
import * as TaskController from '../App/Controller/TaskController.js'
import { authMiddleware } from "../App/Middleware/AuthMiddleware.js";
import { loginValidation, signupValidation } from './../App/Middleware/AuthValidation.js';
const router=express.Router()
//user
router.post('/signup',signupValidation,UserController.MyRegistration)
router.post('/login',loginValidation,UserController.MyLogin)
//authmiddlewares
router.get('/getProfile',authMiddleware,UserController.GetMyProfile)
router.patch('/updateProfile',authMiddleware,UserController.UpdateMyProfile)

router.post('/verify-Email',UserController.VerifyMyEmail)
router.post('/verify-otp',UserController.VerifyMyOtp)
router.post('/ChangePassword',UserController.ChangeMyPassword)

//task
router.post('/createTask',authMiddleware,TaskController.CreateMyTask)
router.delete('/deleteTask/:id',authMiddleware,TaskController.DeleteMyTask)
router.patch('/updateTask/:id',authMiddleware,TaskController.UpdateMyTaskStatus)
router.get('/tasks/:status',authMiddleware, TaskController.GetMyTasksByStatus);
router.get('/countTask',authMiddleware,TaskController.CountTasks)

export default router