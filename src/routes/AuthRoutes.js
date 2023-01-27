import {session,deleteSession, signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'

const AuthRoutes = Router()

// Rotas de autenticação
AuthRoutes.post("/sessions", session)
AuthRoutes.delete("/sessions/:id", deleteSession)
AuthRoutes.get("/sessions/:id", session)
AuthRoutes.post("/sign-up", signUp)
AuthRoutes.post("/sign-in", signIn)
AuthRoutes.get("/sign-in", signIn)
export default AuthRoutes