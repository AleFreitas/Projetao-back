import { getNumberOfItems, cartItems, postItem, removeItem, removeSessions, removeCarts } from '../controller/Cart.js';
import { Router } from 'express';

const cartRouter = Router()

// Rotas de autenticação
cartRouter.get("/number-of-items", getNumberOfItems)
cartRouter.get("/cart-items", cartItems)
cartRouter.post("/post-item", postItem)
cartRouter.post("/remove-item", removeItem)
//FUNÇÃO APENAS PARA TESTES
cartRouter.post("/remove-sessions",removeSessions )
cartRouter.post("/remove-carts",removeCarts)

export default cartRouter