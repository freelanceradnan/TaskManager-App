import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRATION, JWT_SECRET, JWT_SECRET } from '../Config/Config.js'
export const TokenEncorde=(email,user_id)=>{
try {
    const JWT_SECRET=JWT_SECRET
    const JWT_EXPIRATION={expiresIn:JWT_EXPIRATION}
    const PAYLOAD={'email':email,'user_id':user_id}
    return jwt.sign(PAYLOAD,JWT_SECRET,JWT_EXPIRATION)
} catch (error) {
    return {error:{message:error.message}}
}
}
export const TokenDecorde=(token)=>{
    try {
    const JWT_SECRET=JWT_SECRET
    return jwt.verify(token,JWT_SECRET)
    } catch (error) {
        return {error:{message:error.message}}
    }
}