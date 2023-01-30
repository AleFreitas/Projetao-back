import { CheckoutCollection } from "../config/database.js";

export async function checkOut(req, res) {
    const OrderDetails = res.locals.userOrderDetails;
  try {
    await CheckoutCollection.insertOne(OrderDetails);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }
}
