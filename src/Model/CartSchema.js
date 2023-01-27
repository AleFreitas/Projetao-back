import joi from 'joi'

export const cartSchema = joi.object({
    sessionId: joi.string().required(),
    chosenItems: joi.array()
});

export const postItemSchema = joi.object({
    sessionId:joi.string().required(),
    productId:joi.string().required(), 
    quantity:joi.number().required()
})