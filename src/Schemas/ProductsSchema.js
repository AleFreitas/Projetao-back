import joi from 'joi'

export const ProductsSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  image: joi.string().required()
});