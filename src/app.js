import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import AuthRoutes from "./routes/AuthRoutes.js"
import ProductsRouttes from "./routes/ProductsRouttes.js"
import cartRoutes from "./routes/CartRoutes.js";
dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

app.use([AuthRoutes,ProductsRouttes,cartRoutes])

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor funcionando na porta: ${port}`));
