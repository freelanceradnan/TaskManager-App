// registration

export async function MyRegistration(req,res){
try {
    res.status(200).json("user registration success")
} catch (error) {
    res.status(400).json('user registration failed')
}
}
//login
export async function MyLogin(req,res){
    try {
    res.status(200).json("user login success")
} catch (error) {
    res.status(400).json('user login failed')
}
}
//verifyEmail
export async function VerifyMyEmail(req,res){
    try {
    res.status(200).json("user verifyEmail success")
} catch (error) {
    res.status(400).json('user verifyEmail failed')
}
}
//verifyotp
export async function VerifyMyOtp(req,res){
    try {
    res.status(200).json("user verify otp success")
} catch (error) {
    res.status(400).json('user verify otp failed')
}
}
//changePassword
export async function ChangeMyPassword(req,res){
    try {
    res.status(200).json("user changePassword success")
} catch (error) {
    res.status(400).json('user changePassword failed')
}
}
//getprofile

export async function GetMyProfile(req,res){
    try {
    res.status(200).json("user getProfile success")
} catch (error) {
    res.status(400).json('user getProfile failed')
}
}
//profile update
export async function UpdateMyProfile(req,res){
    try {
    res.status(200).json("user updateProfile success")
} catch (error) {
    res.status(400).json('user updateProfile failed')
}
}