import Joi from 'joi';

export const registLoginScheme = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(8).max(20).required()
})