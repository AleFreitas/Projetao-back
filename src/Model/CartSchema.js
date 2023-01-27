import joi from 'joi'

export const cartSchema = joi.object({
    token: joi.string().required(),
    chosenItems: joi.array()
});

export const postItemSchema = joi.object({
    token:joi.string().required(),
    productId:joi.string().required(), 
    quantity:joi.number().required()
})