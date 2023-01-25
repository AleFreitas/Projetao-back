import joi from 'joi'

export const cartSchema = joi.object({
    sessionId: joi.string().required(),
    chosenItems: joi.array()
});