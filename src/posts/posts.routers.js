import express  from "express";
import { auth } from "../../middleWare/auth/auth.js";
import { validation } from "../../middleWare/validation/validation.js";
import * as controllers from "../posts/controller/posts.controller.js"
import { postSchema, updateSchema } from "./post.validation.js";

export const postRoute =express.Router()



//---- add post ---//
postRoute.post("/addPost",auth,validation(postSchema),controllers.addPost)
//---- get user post ---//
postRoute.get("/userPost",auth,controllers.userPost)
//---- get all user post ---//
postRoute.get("/allPost",controllers.allPost)
//---- update post ---//
postRoute.put("/updatePost",auth,validation(updateSchema),controllers.updatePost)
//---- update post status ---//
postRoute.put("/updatePostStatus",auth,controllers.updatePostStatus)
//---- delete post ---//
postRoute.delete("/deletePost",auth,controllers.deletePost)
//-----like post ---//
postRoute.post("/likePost",auth,controllers.likePost)
//-----disLike post ---//
postRoute.post("/disLikePost",auth,controllers.disLikePost)


// // //-----comments post ---//
// postRoute.post("/addCommentsPost",auth,controllers.addCommentsPost)
// // //-----delete comments post ---//
// postRoute.post("/deleteCommentPost",auth,controllers.deleteCommentPost)