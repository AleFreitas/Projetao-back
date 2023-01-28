import { getNumberOfItems, postItem, removeItem } from '../controller/Cart.js';
import { Router } from 'express';

const cartRouter = Router()

// Rotas de autenticação
cartRouter.get("/number-of-items", getNumberOfItems)
cartRouter.post("/post-item", postItem)
cartRouter.post("/remove-item", removeItem)

export default cartRouter