import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobileNumber:Number,
    age:Number,
    profilePicPath:String,
    coverPicPath:String,
    code:{
        type:String,
        default:""
    },
    confirmedEmail:{
        type:Boolean,
        default:false
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
})

export const userModel = mongoose.model("user",userSchema);