import 'dotenv/config'
import jwt from 'jsonwebtoken'
//token encode
export const TokenEncorde = (email, user_id) => {
    try {
        const jwt_token = process.env.JWT_SECRET
        const jwt_expires = process.env.JWT_EXPIRATION || '24h'
        
        const PAYLOAD = { 'email': email, 'user_id': user_id }
        const OPTIONS = { expiresIn: jwt_expires } 
        return jwt.sign(PAYLOAD, jwt_token, OPTIONS) 
        
    } catch (error) {
        return { error: { message: error.message } }
    }
}
//token decode
export const TokenDecorde = (token) => {
    try {
        const jwt_token = process.env.JWT_SECRET
        return jwt.verify(token, jwt_token)
    } catch (error) {
        return { error: { message: error.message } }
    }
}