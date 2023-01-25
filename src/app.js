import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import authRoutes from "./routes/AuthRoutes.js"

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

app.use([authRoutes])

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Servidor funcionando na porta: ${port}`));
