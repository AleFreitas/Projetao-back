import { signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'

const AuthRoutes = Router()

// Rotas de autenticação
AuthRoutes.post("/sign-up", signUp)
AuthRoutes.post("/sign-in", signIn)
export default AuthRoutes