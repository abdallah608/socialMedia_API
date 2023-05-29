import mongoose from "mongoose";

const commentsPostSchema = new mongoose.Schema({

    comment:String,
    commentDate:Date,
    commentCreatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"post"
        }
},{
timestamps:true
}) 


export const commentModel =  mongoose.model("comment",commentsPostSchema)
