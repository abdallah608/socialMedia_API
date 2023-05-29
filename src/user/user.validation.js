import joi from "joi"

export const signupSchema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi.string().email({tlds:{allow:['com','net']}}).required(),
        password:joi.string().pattern(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/).required(),
        confirmPassword:joi.ref("password"),
        age:joi.number().min(18).max(80).required(),
        mobileNumber:joi.number().required()
    
    })

export const loginSchema = 
    joi.object({
        email: joi.string().email({tlds:{allow:['com','net']}}).required(),
        password:joi.string().pattern(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/).required(),    
    })

