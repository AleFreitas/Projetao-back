import { OrderSchema } from "../Schemas/Checkout.schema.js";

export function CheckoutPostValidation(req, res, next) {
  const {
    email,
    TelNumber,
    FirstName,
    LastName,
    ZIPCode,
    AddressDescription,
    AddressNumber,
    AddressComplement,
  } = req.body;

  const user = res.locals.user;

  console.log(user);
  
  const orderFormat = {
    email,
    TelNumber,
    FirstName,
    LastName,
    ZIPCode,
    AddressDescription,
    AddressNumber,
    AddressComplement,
    id: user._id,
    createdDay: dayjs().format("DD/MM/YYYY"),
    createdTime: dayjs().format("HH:mm:ss"),
  };
  const { error } = OrderSchema.validate(orderFormat, {abortEarly:false});
  if (error) {
    res.sendStatus(401);
    return;
  }
  res.locals.userOrderDetails = orderFormat;
  next();
}
