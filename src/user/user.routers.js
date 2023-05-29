import express from "express";
import { auth } from "../../middleWare/auth/auth.js";
import { validation } from "../../middleWare/validation/validation.js";
import { fileUpload } from "../../utilities/upload/fileUpload.js";
import * as controllers from "../user/controller/user.controller.js"
import { loginSchema, signupSchema } from "./user.validation.js";
export const userRoute = express.Router();

//-- register --//
userRoute.post("/signup",fileUpload(),validation(signupSchema),controllers.signup)
//-- verify mail --//
userRoute.get("/verify/:token",controllers.verify)
//-- login --//
userRoute.post("/signIn",validation(loginSchema),controllers.signIn)
//--  add Cover Pic --//
userRoute.post("/addCoverPic",auth,controllers.addCoverPic)
//-- update data --//
userRoute.put("/update",auth,controllers.updateData)
//-- update ProfilePic --//
userRoute.put("/updateProfilePic",auth,fileUpload(),controllers.updateProfilePic)
//-- update coverPic --//
userRoute.put("/updateCoverPic",auth,fileUpload(),controllers.updateCoverPic)
//-- delete user --//
userRoute.delete("/delete",auth,controllers.deleteData)
//-- soft delete --//
userRoute.delete("/softDeleted",auth,controllers.softDeleted)
//-- change password when was login  --//
userRoute.put("/changePassword",auth,controllers.changePassword)
//-- forget password --//
userRoute.post("/forgetPassword",controllers.forgetPassword)
//-- handel forget password --//
userRoute.get("/resetPassword/:token",controllers.resetPassword)
//-- logout --//
userRoute.put("/logOut",auth,controllers.logOut)