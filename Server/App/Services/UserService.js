import users from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { TokenEncorde } from "../Utils/Token.js";

import { EmailSend } from "../Utils/Emailsent.js";
export async function CreateUser(email, firstName, lastName, mobile, password) {
  const normalizedEmail = email.toLowerCase();
  try {
    const isExitingUser = await users.findOne({ email: email });
    if (isExitingUser) {
      return { success: false, message: "user already exists!" };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await users.create({
      email: normalizedEmail,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      password: passwordHash,
    });
    return { success: true, message: "user created success!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
// 1. Service Layer Function
export async function LoginUser(email, password) {
  const normalizedEmail = email.toLowerCase();

  const isExistingUser = await users
    .findOne({ email: normalizedEmail })
    .select("+password");
  if (!isExistingUser) {
    throw new Error("Invalid credentials");
  }
  const passwordMatch = await bcrypt.compare(password, isExistingUser.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }
  const token = await TokenEncorde(normalizedEmail, isExistingUser._id);
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
      data: user,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function UpdateProfile(
  user_id,
  email,
  firstName,
  lastName,
  mobile,
  password,
) {
  try {
    const result = await users.updateOne(
      { _id: user_id },
      { email, firstName, lastName, mobile, password },
    );
    if (!result) {
      return { success: false, message: "user update failed" };
    }
    return { success: true, message: "user update done" };
  } catch (error) {
    return { success: false, message: "user update failed" };
  }
}
export async function VerifyEmail(email) {
  const normalizedEmail = email.toLowerCase();
  try {
    const isExistingUser = await users.findOne({ email: normalizedEmail });
    if (!isExistingUser) {
      return { success: false, message: "user not found!" };
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    isExistingUser.otp = otp;
    
    await isExistingUser.save();
    const otpsend = await EmailSend({
      email: normalizedEmail,
      sub: "otp code",
      message: `your otp code is ${otp}`,
    });
    if (!otpsend.success) {
      return { success: false, message: "failed to send otp" };
    }
    return { success: true, message: `otp send success ${otp}` };
  } catch (error) {
    return { success: false, message: `otp send failed ${otp}` };
  }
}
export async function VerifyOtp(email,otp) {
    const normalizedEmail=email.toLowerCase()
    try {
    const isExistingUser=await users.findOne({email:normalizedEmail})
    if(!isExistingUser){
    return {success:false,message:"user not find!"}
    }  
    const otpMatch=await users.findOne({otp:otp})
    if(!otpMatch){
    return {success:false,message:"otp and user not found!"}
    }
    return {success:true,message:"otp verify success!"}
    } catch (error) {
        return {success:false,message:"otp verify failed!"}
    }
}
export async function ChangePassword(email,otp,password) {
    const normalizedEmail=email.toLowerCase()
    try {
     const isExistingUser=users.findOne({email:normalizedEmail})
     if(!isExistingUser){
     return {success:true,message:"email varified success!"}
     }
     const matchotp=await users.findOne({email:normalizedEmail,otp:otp})
     if(!matchotp){
     return {success:false,message:"otp not match"}
     }
     const newPassword=await bcrypt.hash(password,10)
     await users.updateOne({email:normalizedEmail},
        {
            $set:{
                otp: '0', 
                    password: newPassword
            }
        }
     )
     return { success:true,message:"password update success!"}
    } catch (error) {
        return { success:false,message:"password update failed!"}
    }
}
