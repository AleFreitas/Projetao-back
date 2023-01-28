import joi from 'joi'

export const cartSchema = joi.object({
    token: joi.string().required(),
    chosenItems: joi.array()
});

export const postItemSchema = joi.object({
    token: joi.string().required(),
    product: joi.object().required()
})

export const postItemProductSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    quantity: joi.number().required()
})