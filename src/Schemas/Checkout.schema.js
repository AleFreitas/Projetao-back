import joi from "joi";

export const OrderSchema = joi.object({
  email: joi.email().required(),
  FirstName: joi.string().required(),
  LastName: joi.number().required(),
  TelNumber: joi.number().required(),
  ZIPCode: joi.number().required().min(8),
  AddressDescription: joi.string().required(),
  AddressNumber: joi.string().required(),
  AddressComplement: joi.string().optional(),
  createdDay: joi.string().required(),
  createdTime: joi.string().required()
});
