import { TokenDecorde } from "../Utils/Token.js"

export async function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    
    try {
    
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access Denied: No token provided!" 
            });
        }
        
        const decode = await TokenDecorde(token);
        if (!decode) {
            return res.status(401).json({ 
                success: false, 
                message: "Access Denied: Invalid or expired token" 
            });
        }
      
        const email = decode.email;
        const user_id = decode.user_id;
        
        req.headers.email = email;
        req.headers.user_id = user_id;

        next();

    } catch (error) {

        return res.status(401).json({ 
            success: false, 
            message: error.message || "Authentication failed" 
        });
    }
}