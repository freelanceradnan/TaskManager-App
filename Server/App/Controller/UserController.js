// registration

import { CreateUser, LoginUser,GetProfile, UpdateProfile, VerifyEmail, VerifyOtp, ChangePassword} from "../Services/UserService.js"

export async function MyRegistration(req, res) {
    const { email, firstName, lastName, mobile, password } = req.body;
   
    try {
        
        if (!email || !firstName || !lastName || !mobile || !password) {
            return res.status(400).json({ 
                status: 'error', 
                message: "Please enter right details to create an account!" 
            });
        }

       
        const result = await CreateUser(email, firstName, lastName, mobile, password);
        
     
        if (!result.success) {
            return res.status(400).json({ 
                status: 'error', 
                message: result.message || "User already exists!" 
            });
        }

        
        return res.status(201).json({ 
            status: 'success', 
            message: "User registration success" 
        });

    } catch (error) {
        console.error("Registration Error: ", error);
        return res.status(500).json({ 
            status: 'error', 
            message: 'User registration failed due to server error' 
        });
    }
}
//login
export async function MyLogin(req, res) {
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please Enter Your Login Details!" 
            });
        }

        const result = await LoginUser(email, password);
        
       
        if (!result || result.success === false) {
            return res.status(401).json({ 
                success: false, 
                message: result?.message || "User login failed" 
            });
        }
        
      
        return res.status(200).json({
            success: true,
            message: "User login success",
            data: result 
        });

    } catch (error) {
        
        return res.status(500).json({ 
            success: false, 
            message: error.message || "An unexpected error occurred" 
        });
    }
}
//getprofile

export async function GetMyProfile(req,res){
    const user_id=req.headers['user_id']
    try {
    if(!user_id){
    res.status(400).json("userid not found!")
    }
    const result=await GetProfile(user_id)
    if(!result.success){
    res.status(400).json({status:failed,message:"failed to get user"})
    }
    res.status(200).json({status:'success',message:result})
} catch (error) {
    return res.status(500).json({ 
        status: "failed", 
        message: error.message || 'user getProfile failed' 
    });
}
}
//profile update
export async function UpdateMyProfile(req,res){
    const user_id=req.headers['user_id']
    const {email,firstName,lastName,mobile,password}=req.body
    try {
    if(!user_id){
    res.status(200).json("userid not found!")
    }
    if(!email || !firstName ||!lastName || !mobile ||!password){
    res.status(200).json("update data missing!")
    }
    const result=await UpdateProfile(user_id,email,firstName,lastName,mobile,password)
    if(!result.success){
        res.status(400).json({status:'success',message:'user updated failed!'})
    }
    res.status(200).json({status:"success",message:'update success'})
} catch (error) {
    res.status(400).json('user updateProfile failed')
}
}
//verifyEmail
export async function VerifyMyEmail(req,res){
    const {email}=req.body
    try {
    if(!email){
    return res.status(200).json('email not found!')
    }
    const result=await VerifyEmail(email)
    if(!result.success){
    return res.status(400).json("failed to verify email")
    }
    res.status(200).json(result.message)
} catch (error) {
    res.status(400).json('user verifyEmail failed')
}
}
//verifyotp
export async function VerifyMyOtp(req,res){
    const {email,otp}=req.body
    try {
    if(!email || !otp){
    return res.status(200).json("email and otp missing ")
    }
    const result=await VerifyOtp(email,otp)
    if(!result.success){
    return res.status(400).json("otp mitmatch")
    }
    res.status(200).json("otp match success!")
} catch (error) {
    res.status(400).json('user verify otp failed')
}
}
//changePassword
export async function ChangeMyPassword(req, res) {
    const { email, otp, password } = req.body;
    
    try {
        if (!email || !otp || !password) {
            return res.status(400).json({ message: "Change password fields data missing!" });
        }
        const result = await ChangePassword(email, otp, password);
        if (!result.success) {
            return res.status(400).json({ message: result.message || "Failed to change password" });
        }
        return res.status(200).json({ message: "User password changed successfully!" });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({ message: "Internal server error during password change" });
    }
}
