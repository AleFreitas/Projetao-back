import { Router } from 'express';
import { checkOut } from '../controllers/Checkout.controller.js';
import { authValidation } from '../middlewares/AuthValidation.middleware.js';
import { CheckoutPostValidation } from "../middlewares/CheckoutOrder.middleware.js"

const checkoutRoutes = Router();
checkoutRoutes.use(authValidation);
checkoutRoutes.post("/checkout", CheckoutPostValidation, checkOut);

export default checkoutRoutes