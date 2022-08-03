import Joi from 'joi';

export const scheme = Joi.object({
    todo: Joi.string()
        .min(2)
        .max(200)
        .required()
})

