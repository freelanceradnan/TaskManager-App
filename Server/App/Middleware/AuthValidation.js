import Joi from 'joi'
export const signupValidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().min(3).max(100).required(),
        firstName:Joi.string().max(100).required(),
        lastName:Joi.string().max(100).required(),
        mobile:Joi.number().min(11).max(11).required(),
        password:Joi.string().min(4).max(100).required()
    })
    const {error}=schema.validate(req.body)
    if(error){
        return res.status(400).json({message:"Bad request",error:error.details[0].message})
    }
}
export const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().min(3).max(100).required(),
        password:Joi.string().min(4).max(100).required()
    })
    const {error}=schema.validate(req.body)
    if(error){
        return res.status(400).json({message:"Bad request",error:error.details[0].message})
    }
}