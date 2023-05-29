import { postModel } from "../../../dataBase/models/postsModel/posts.model.js";
import appError from "../../../utilities/error/appError.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";


//---- add post ---//
export const addPost = catchAsyncError(
    async(req,res,next)=>{
        let {title,text}=req.body
        let id =req.userId
        if(id== undefined){return next(new appError("you should login first",404))}
        let time=Date.now()
        let addPost= await postModel.insertMany({title,text,createdBy:id,postDate:time})
        res.status(200).json({message:"done",addPost})
    }
)
//---- get user post ---//
export const userPost= catchAsyncError(
    async(req,res,next)=>{
        let found= await postModel.find({createdBy:req.userId}).populate("createdBy","-password -__v -confirmedEmail -isLoggedIn -code -isOnline -isDeleted")
        if(!found){return next(new appError("no posts found",400))}
        res.status(200).json({message:"done",found})
    }
)

//---- get all user post ---//
export const allPost= catchAsyncError(
    async(req,res,next)=>{
        let found= await postModel.find({}).populate("createdBy","-password -__v -confirmedEmail -isLoggedIn -code -isOnline -isDeleted")
        if(!found){return next(new appError("no posts found",400))}
        res.status(200).json({message:"done",found})
    }
)
//---- delete post ---//
export const deletePost= catchAsyncError(
    async(req,res,next)=>{
        let{_id}=req.body
        let id=req.userId
        let founded = await postModel.findById({_id})
        if(!founded){return next(new appError("no posts found",400))}
        if(founded.createdBy != id){return next(new appError("you are not authorized",404))}
        let deleted = await postModel.deleteOne({_id})
        if(!deleted){return next(new appError("no posts found",400))}
        res.status(200).json({message:"done",deleted})
   
    }
)
//---- update post ---//
export const updatePost= catchAsyncError(
    async(req,res,next)=>{
        let{_id,text,title}=req.body
        let id=req.userId
        let founded = await postModel.findOne({_id})
        if(!founded){return next(new appError("no posts found",400))}
        if(founded.createdBy != id){return next(new appError("you are not authorized",404))}
        let updated = await postModel.updateOne({_id},{title,text})
        if(!updated){return next(new appError("no thing updated",400))}
        res.status(200).json({message:"done",updated})
   
    }
)
//---- update post status ---//
export const updatePostStatus= catchAsyncError(
    async(req,res,next)=>{
        let{_id,privacy}=req.body
        let id=req.userId
        let founded = await postModel.findOne({_id})
        if(!founded){return next(new appError("no posts found",400))}
        if(founded.createdBy != id){return next(new appError("you are not authorized",404))}
        let updated = await postModel.updateOne({_id},{privacy})
        if(!updated){return next(new appError("no thing updated",400))}
        res.status(200).json({message:"done",updated})
   
    }
)


//-----like post ---//

export const likePost = catchAsyncError(
    async(req,res,next)=>{
        let{postId}=req.body
        let id=req.userId
        let likes = await postModel.findByIdAndUpdate(postId,{$addToSet:{likesId:[id]},$pull:{disLikesId:id}},{new:true})
        if(!likes){return next(new appError("not found",400))}
        likes.totalLike = likes.likesId.length - likes.disLikesId.length
        likes.save() 
        res.status(200).json({message:"done",likes})
    }
)
//-----disLike post ---//

export const disLikePost = catchAsyncError(
    async(req,res,next)=>{
        let{postId}=req.body
        let id=req.userId
        let likes = await postModel.findByIdAndUpdate(postId,{$addToSet:{disLikesId:[id]},$pull:{likesId:id}},{new:true})
        if(!likes){return next(new appError("not found",400))}
        likes.totalLike = likes.likesId.length - likes.disLikesId.length
        likes.save() 
        res.status(200).json({message:"done",likes})
    }
)


// // //-----add Comments post ---//

// export const addCommentsPost = catchAsyncError(
//     async(req,res,next)=>{
//         let{postId,comment}=req.body
//         let id=req.userId
//         let comments = await postModel.findByIdAndUpdate(postId,{$push:{commentsId:[id],comment},$pull:{deleteCommentsId:id}},{new:true})
//         if(!comments){return next(new appError("not found",400))}
//         comments.totalComment = comments.comment.length 
//         comments.save() 
//         res.status(200).json({message:"done",comments})
//     }
//     )
//     //-----remove Comments post ---//
    
// export const deleteCommentPost = catchAsyncError(
//     async(req,res,next)=>{
//         let{postId,comment}=req.body
//         let id=req.userId
//         let founded = await postModel.findOne({postId})
//         if(!founded){return next(new appError("no posts found",400))}
//         if(founded.createdBy != id){return next(new appError("you are not authorized",404))}
//         let comments = await postModel.findByIdAndUpdate(postId,{$pull:{comment,commentsId:[id]},$push:{deleteCommentsId:id}},{new:true})
//         if(!comments){return next(new appError("not found",400))}
//         comments.totalComment = comments.comment.length 
//         comments.save() 
//         res.status(200).json({message:"done",comments})
//     }
// )
