import express  from "express";
import { auth } from "../../middleWare/auth/auth.js";
import { validation } from "../../middleWare/validation/validation.js";
import * as controllers from "../comments/controller/comment.controller.js"
import { commentSchema } from "./comment.validation.js";

export const commentRoute =express.Router()



//---- add comment ---//
commentRoute.post("/addComment",auth,validation(commentSchema),controllers.addComment)
//---- update comment ---//
commentRoute.put("/updateComment",auth,controllers.updateComment)
//---- delete comment ---//
commentRoute.delete("/deleteComment",auth,controllers.deleteComment)
//---- show post comment ---//
commentRoute.get("/getComment",controllers.getComment)
