import joi from 'joi'

export const cartSchema = joi.object({
    userId: joi.string().required(),
    sessionId: joi.string().required(),
    chosenItems: joi.array()
});