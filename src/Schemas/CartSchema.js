import joi from 'joi'

export const cartSchema = joi.object({
    token: joi.string().required(),
    chosenItems: joi.array()
});

export const postItemSchema = joi.object({
    token:joi.string().required(),
    product:joi.object().required(), 
    quantity:joi.number().required()
})