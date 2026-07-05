import  users  from "../Models/UserModel.js";
import bcrypt from 'bcryptjs'
import { TokenEncorde } from "../Utils/Token.js";
export async function CreateUser(email,firstName,lastName,mobile,password){
    const normalizedEmail=email.toLowerCase();
try {
  const isExitingUser=await users.findOne({email:email})
  if(isExitingUser){
    return {success:false,message:"user already exists!"}
  }
  const passwordHash=await bcrypt.hash(password,10)
  const result=await users.create({
   email:normalizedEmail,
   firstName:firstName,
   lastName:lastName,
   mobile:mobile,
   password:passwordHash
  })
  return {success:true,message:"user created success!"}
} catch (error) {
    return {success:false,message:error.message}
}
}
// 1. Service Layer Function
export async function LoginUser(email, password) {
    const normalizedEmail = email.toLowerCase();
    
    const isExistingUser = await users.findOne({ email: normalizedEmail }).select("+password");
    if (!isExistingUser) {
        throw new Error("Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(password, isExistingUser.password);
    if (!passwordMatch) {
        throw new Error("Invalid credentials");
    }
    const token = await TokenEncorde(normalizedEmail,isExistingUser._id);
    if (!token) {
        throw new Error("Failed to generate token");
    }

    return { success: true, token };
}


export async function GetProfile(user_id) {
    try {
        const user = await users.findOne({ _id: user_id });
        if (!user) {
            return { success: false, message: "user not found!" };
        }
        return { 
            success: true, 
            data: user 
        };
        
    } catch (error) {
        return { success: false, message: error.message }; 
    }
}
export async function UpdateMyProfile(){

}
export async function VerifyMyEmail(){

}
export async function VerifyMyOtp(){

}
export async function ChangeMyPassword(){

}