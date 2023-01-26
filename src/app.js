import express from "express"
import cors from "cors"
import AuthRoutes from "./routes/AuthRoutes.js"
import ProductsRouttes from "./routes/ProductsRouttes.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use([AuthRoutes,ProductsRouttes])

app.listen(5000, () => {
  console.log('Servidor conectado')
})