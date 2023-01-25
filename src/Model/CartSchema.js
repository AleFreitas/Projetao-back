import joi from 'joi'

export const cartSchema = joi.object({
    userId: joi.string().required()
});