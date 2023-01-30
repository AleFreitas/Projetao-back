import {
    listProducts,
    getProductById,
    createProduct,
    deleteProduct
  } from "../controllers/Products.js"
  import { Router } from 'express'
  import { validateSchema } from "../middlewares/validateSchema.js"
  import { ProductsSchema } from "../Schemas/ProductsSchema.js"
  
  const ProductsRoutes = Router()
  
  
  ProductsRoutes.get("/products", listProducts)
  ProductsRoutes.post("/products", validateSchema(ProductsSchema), createProduct)
  ProductsRoutes.get("/products/:id",  getProductById)
  ProductsRoutes.delete("/products/:id", deleteProduct)
  
  export default ProductsRoutes