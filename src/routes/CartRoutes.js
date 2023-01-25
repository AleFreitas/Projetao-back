import { getNumberOfItems } from '../controller/Cart';
import { Router } from 'express';

const cartRouter = Router()

// Rotas de autenticação
cartRouter.post("/number-of-items", getNumberOfItems)

export default cartRouter