import mongoose from "mongoose";

const TasksSchema=mongoose.Schema({
    title:{type:String,trim:true,required:true},
    description:{type:String,trim:true,required:true},
    status:{type:String,trim:true,required:true,
        enum:['processing','pending','completed']
    },
    user_id:{type:mongoose.Schema.Types.ObjectId,trim:true,required:true,ref:'users'}
},
{
    versionKey:false,
    timestamps:true
}
)

const tasks=mongoose.model('tasks',TasksSchema)
export default tasks