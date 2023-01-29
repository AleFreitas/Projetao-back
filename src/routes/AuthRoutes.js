import { signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import { userSchema, loginSchema } from '../Schemas/AuthSchema.js'
import { validateSchema } from "../middleware/validateSchema.js"
const AuthRoutes = Router()

// Rotas de autenticação
AuthRoutes.post("/sign-up",validateSchema(userSchema), signUp)
AuthRoutes.post("/sign-in", validateSchema(loginSchema), signIn)
export default AuthRoutes