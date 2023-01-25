import express from "express"
import cors from "cors"
import AuthRoutes from "./routes/AuthRoutes.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use([AuthRoutes])

app.listen(5000, () => {
  console.log('Servidor conectado')
})