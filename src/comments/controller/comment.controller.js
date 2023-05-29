import { commentModel } from "../../../dataBase/models/commentsPostModel/commentsPost.model.js";
import appError from "../../../utilities/error/appError.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";


//---- add comment ---//
export const addComment = catchAsyncError(
    async (req,res,next)=>{
        let{postId,comment}=req.body
        let id=req.userId
        if(id== undefined){return next(new appError("you should login first",404))}
        let time=Date.now()
        let added= await commentModel.insertMany({postId,commentCreatedBy:id,comment,commentDate:time})
        res.status(200).json({message:"done",added})
    }
)
//---- update comment ---//
export const updateComment = catchAsyncError(
    async (req,res,next)=>{
        let{_id,editComment}=req.body
        let id=req.userId
        let founded = await commentModel.findById({_id})
        if(id== undefined){return next(new appError("you should login first",404))}
        if(!founded){return next(new appError("no comment found",400))}
        if(founded.commentCreatedBy != id){return next(new appError("you are not authorized",404))}
        let updated= await commentModel.findByIdAndUpdate(_id,{comment:editComment},{new:true})
        res.status(200).json({message:"done",updated})
    }
)
//---- delete comment ---//
export const deleteComment = catchAsyncError(
    async (req,res,next)=>{
        let{_id}=req.body
        let id=req.userId
        let founded = await commentModel.findById({_id})
        if(id== undefined){return next(new appError("you should login first",404))}
        if(!founded){return next(new appError("no comment found",400))}
        if(founded.commentCreatedBy != id){return next(new appError("you are not authorized",404))}
        let deleted= await commentModel.deleteOne({_id})
        res.status(200).json({message:"done",deleted})
    }
)
//---- show post comment ---//
export const getComment = catchAsyncError(
    async (req,res,next)=>{
        let{postId}=req.body
        let comments= await commentModel.find({postId}).populate("commentCreatedBy","-password -__v -confirmedEmail -isLoggedIn -code -isOnline -isDeleted")
        if(!comments){return next(new appError("no posts found",400))}
        res.status(200).json({message:"done",comments})
    }
)


