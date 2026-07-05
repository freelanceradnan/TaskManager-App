import 'dotenv/config'
import jwt from 'jsonwebtoken'
export const TokenEncorde=(email,user_id)=>{
try {
    const JWT_SECRET=process.env.JWT_SECRET
    const JWT_EXPIRATION={expiresIn:process.env.JWT_EXPIRATION}
    const PAYLOAD={'email':email,'user_id':user_id}
    return jwt.sign(PAYLOAD,JWT_SECRET,JWT_EXPIRATION)
} catch (error) {
    return {error:{message:error.message}}
}
}
export const TokenDecorde=(token)=>{
    try {
    const JWT_SECRET=process.env.JWT_SECRET
    return jwt.verify(token,JWT_SECRET)
    } catch (error) {
        return {error:{message:error.message}}
    }
}