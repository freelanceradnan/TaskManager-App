import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{type:String,trim:true,required:true},
    firstName:{type:String,trim:true,required:true},
    lastName:{type:String,trim:true,required:true},
    mobile:{type:Number,trim:true,required:true},
    email:{type:String,trim:true,required:true},
    otp:{type:Number,trim:true,default:0}
})

const users=mongoose.model('users',userSchema)
export const users