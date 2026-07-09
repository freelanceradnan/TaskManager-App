import cors from 'cors'
import 'dotenv/config'
import helmet from 'helmet'
import express from 'express'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import { MAX_JSON_SIZE, MAX_REQUEST_TIME, MAX_REQUST_NUMBER, PORT } from './App/Config/Config.js'
import router from './Router/Api.js'
import mongoose from 'mongoose'
import { connectDB } from './App/Config/ConnetionDb.js'


//initialization
const app=express()
//middlwares
app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(express.json({limit:MAX_JSON_SIZE}))
app.use(express.urlencoded({extended:true,limit:"5mb"}))
const limiter=rateLimit({
    windowMs:MAX_REQUEST_TIME,
    max:MAX_REQUST_NUMBER,
    message:"max request from this ip"
})
app.use(limiter)
app.set('etag',false)
//connection db
connectDB()

//connect router
app.use('/api',router)

//init server
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})