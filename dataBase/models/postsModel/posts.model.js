import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title:String,
    text:String,
    postDate:Date,
    likesId:[{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }],
    disLikesId:[{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }],
    totalLike:{
        type:Number,
        default:0
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
        },
    privacy:{
        type:String,
        enum:['private','public'],
        default:"public"
    }
    // ,
    // comment:[{
    //     type:String
    // }],
    // commentsId:[{
    //     type:mongoose.Types.ObjectId,
    //     ref:"user"
    // }],
    // deleteCommentsId:[{
    //     type:mongoose.Types.ObjectId,
    //     ref:"user"
    // }],
    // totalComment:Number

},{
timestamps:true
}) 


export const postModel =  mongoose.model("post",postSchema)
