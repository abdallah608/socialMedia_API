import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../../../dataBase/models/userModel/user.model.js"
import appError from "../../../utilities/error/appError.js"
import catchAsyncError from "../../../utilities/error/catchAsyncError.js"
import { sendEmail } from "../../../utilities/services/email.js"
import cloudinary from "../../../utilities/upload/cloudinary.js"
import { sendForgetEmail } from "../../../utilities/services/forgetPassword.js"
import { nanoid } from "nanoid"


//-- register --//
export const signup =catchAsyncError(async(req,res,next)=>{
    if(!req.file){return next(new appError("file type not accepted",400))}
    let{email,name,password,confirmPassword,age,mobileNumber}=req.body
    let founded= await userModel.findOne({email})
    if(founded){return next(new appError("Email already registered",400))}
        if(password!==confirmPassword){return next(new appError("Password not matched",400))}
        let {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:"pic"})
        let  hashPassword= bcrypt.hashSync(password,Number(process.env.Rounded))
        let addUser = await userModel.insertMany({email,name,password:hashPassword,age,mobileNumber,profilePicPath:secure_url})
        sendEmail({email,name})
        res.status(201).json({message:"done",addUser})
    
})
//-- verify mail --//
export const verify= catchAsyncError(async(req,res,next)=>{
        let {token} = req.params
        
        jwt.verify(token,process.env.verifyKey,async(err,decoded)=>{
        if(err) {return  next( new appError("invalid token",401))}
         
              let updated = await userModel.findOneAndUpdate({email:decoded.email},{confirmedEmail:true},{new:true})
                updated.password=undefined
                res.status(200).json({message:"done",updated})
            
            
        })
    
})
//-- login --//
export const signIn = catchAsyncError(
        async(req,res,next)=>{
                let {email,password} = req.body
                let founded= await userModel.findOne({email})
                if(!founded){return next(new appError("Email not registered please signup first",404))}
                if(founded && founded.confirmedEmail==false){return next(new appError("you should confirmed email first check your email",400))}
                let matched = bcrypt.compareSync(password,founded.password)
                if(!matched){return next(new appError("password is incorrect",400))}
                let token = jwt.sign({email:founded.email,id:founded._id},process.env.secretKey)
                let isLoggedIn = await userModel.findOneAndUpdate({email},{isLoggedIn:true,isOnline:true},{new:true})
                res.status(200).json({message:"done",token,isLoggedIn})
                
        }
)
//--  add Cover Pic --//
export const addCoverPic = catchAsyncError(
        async(req,res,next)=>{
        if(!req.file){return next(new appError("file type not accepted",400))}
        let{_id}=req.body
        let id=req.userId
        let founded = await userModel.findOne({_id})    
        if(founded._id!=id){return next(new appError("you are not authorized",404))}
        let {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:"pic"})
        let added=await userModel.findByIdAndUpdate(_id,{coverPicPath:secure_url},{new:true})
        res.status(200).json({message:"done",added})
        }
) 
//-- update data --//
export const updateData = catchAsyncError(
        async(req,res,next)=>{
        let{_id,mobileNumber,name}=req.body
        let id=req.userId
        let founded = await userModel.findOne({_id})    
        if(founded._id!=id){return next(new appError("you are not authorized",404))}
        let updated=await userModel.findByIdAndUpdate(_id,{mobileNumber,name},{new:true})
        res.status(200).json({message:"done",updated})
        }
) 
//-- updateProfilePic --//
export const updateProfilePic = catchAsyncError(
        async(req,res,next)=>{
        if(!req.file){return next(new appError("file type not accepted",400))}
        let{_id}=req.body
        let id=req.userId
        let founded = await userModel.findOne({_id})    
        if(founded._id!=id){return next(new appError("you are not authorized",404))}
        let {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:"pic"})
        let updated=await userModel.findByIdAndUpdate(_id,{profilePicPath:secure_url},{new:true})
        res.status(200).json({message:"done",updated})
        }
) 
//-- updateCoverPic --//
export const updateCoverPic = catchAsyncError(
        async(req,res,next)=>{
        if(!req.file){return next(new appError("file type not accepted",400))}
        let{_id}=req.body
        let id=req.userId
        let founded = await userModel.findOne({_id})    
        if(founded._id!=id){return next(new appError("you are not authorized",404))}
        let {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:"pic"})
        let updated=await userModel.findByIdAndUpdate(_id,{coverPicPath:secure_url},{new:true})
        res.status(200).json({message:"done",updated})
        }
) 

//-- delete user --//
export const deleteData = catchAsyncError(
        async(req,res,next)=>{
        let {_id}=req.body
        let id=req.userId
        let founded = await userModel.findOne({_id})    
        if(founded._id!=id){return next(new appError("you are not authorized",404))}
        let deleted=await userModel.findByIdAndDelete(_id)
        if(deleted == null){return next(new appError("user Notfound",404))}
        res.status(200).json({message:"done",deleted})
        }
)

//-- soft delete --//
export const softDeleted= catchAsyncError( async(req,res,next)=>{
        let {_id}=req.body
        let id=req.userId
        let founded = await userModel.findOne({_id})    
        if(founded._id!=id){return next(new appError("you are not authorized",404))}
        let isDeleted = await userModel.findByIdAndUpdate(_id,{isDeleted:true})
        if(isDeleted==true){next(new appError("already deleted",400))}
        res.status(200).json({message:"done",isDeleted})
        }
        
        )  

//-- change password when was login  --//
export const changePassword = catchAsyncError(
       async (req,res,next)=>{
        let {email,password} =req.body
        let id=req.userId
        let founded = await userModel.findOne({email})    
        if(!founded){return next(new appError("userNotfound",404))}
        if(founded._id!=id){return next(new appError("you are not authorized",404))}
        let matched = bcrypt.compareSync(password,founded.password)
        if(matched){return next(new appError("matched with old password",400))} 
        let hashPassword= bcrypt.hashSync(password,Number(process.env.Rounded))
        let updatePassword = await userModel.updateOne({email},{password:hashPassword})
        res.status(200).json({message:"done",updatePassword}) 
        }    
)


//-- forget password --//
export const forgetPassword = catchAsyncError(
        async(req,res,next)=>{
        let {email,name}=req.body
        let user = await userModel.findOne({email})
        if(!user){return next(new appError("user not found please register as a new user",404))}
        let code = nanoid(4)   
        sendForgetEmail({email,name,code})
        const sendCode= await userModel.findOneAndUpdate({email},{code},{new:true})
        res.status(200).json({message:"done",sendCode})
    }
    )

//-- handel forget password --//
export const resetPassword =catchAsyncError( 
        async(req,res,next)=>{
        let {token}=req.params
        let{newPassword,code}=req.body
        if(!token){return next(new appError("invalid token"),401)}
            jwt.verify(token,process.env.verifyKey,async(err,decoded)=>{
            if(err) {return next(new appError("invalid token"),401)}  
            let user= await userModel.findOne({email:decoded.email})
            if(!user){return next(new appError("not found this user",401))} 
            if (code==""){return next(new appError("code not send",400))}
            let matched = bcrypt.compareSync(newPassword,user.password)
            if(matched){return next(new appError("this is the old password",400))} 
            let hashPassword = bcrypt.hashSync(newPassword,Number(process.env.Rounded))
            let changePassword = await userModel.findOneAndUpdate({code},{password:hashPassword,code:""},{new:true})     
            if(changePassword == null){return next(new appError("please send code again",400))} 
                res.status(200).json({message:"done",changePassword})
            
            
        })
        }
        )

//-- logout --//
export const logOut = catchAsyncError( async(req,res,next)=>{
            let {_id}=req.body
            let id=req.userId
            let founded = await userModel.findOne({_id})    
            if(founded._id!=id){return next(new appError("you are not authorized",404))}
            let logout = await userModel.findByIdAndUpdate(_id,{isLoggedIn:false,isOnline:false},{new:true})
            res.status(200).json({message:"done",logout})
            
        }
        )