import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import authRoutes from "./routes/AuthRoutes.js"
import cartRoutes from "./routes/CartRoutes.js";

dotenv.config();

const server = express()
server.use(express.json())
server.use(cors())

server.use([authRoutes, cartRoutes])

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Servidor funcionando na porta: ${port}`));
