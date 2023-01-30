import { getNumberOfItems, cartItems, postItem, removeItem, totalPrice ,removeCarts} from '../controller/Cart.js';
import { Router } from 'express';

const cartRouter = Router()

// Rotas de autenticação
cartRouter.get("/number-of-items", getNumberOfItems)
cartRouter.get("/cart-items", cartItems)
cartRouter.post("/post-item", postItem)
cartRouter.post("/remove-item", removeItem)
cartRouter.get("/total-price",totalPrice)
cartRouter.post("/remove",removeCarts)
export default cartRouter