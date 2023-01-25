import { getNumberOfItems, createCart, postItem } from '../controller/Cart';
import { Router } from 'express';

const cartRouter = Router()

// Rotas de autenticação
cartRouter.get("/number-of-items", getNumberOfItems)
cartRouter.post("/create-cart", createCart)
cartRouter.post("/post-item", postItem)

export default cartRouter