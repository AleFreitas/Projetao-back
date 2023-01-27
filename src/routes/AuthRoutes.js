import {session, signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'

const AuthRoutes = Router()

// Rotas de autenticação
AuthRoutes.post("/sessions", session)
AuthRoutes.post("/sign-up", signUp)
AuthRoutes.post("/sign-in", signIn)
export default AuthRoutes