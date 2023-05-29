import joi from "joi"

export const postSchema = joi.object({
    title: joi.string().min(3).max(40).required(),
    text: joi.string().min(3).max(200).required()
    })
export const updateSchema = joi.object({
    title: joi.string().min(3).max(40).required(),
    text: joi.string().min(3).max(200).required(),
    _id:joi.string().hex().length(24),
    })