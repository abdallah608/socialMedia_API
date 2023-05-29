import joi from "joi"

export const commentSchema = joi.object({
    comment: joi.string().min(3).max(300).required(),
    postId:joi.string().hex().length(24),
    })