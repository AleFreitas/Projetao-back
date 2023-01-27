import {
    listProducts,
    getProductById,
    createProduct,
    deleteProduct
  } from "../controller/Products.js"
  import { Router } from 'express'
  import { validateSchema } from "../middleware/validateSchema.js"
  import { ProductsSchema } from "../Schemas/ProductsSchema.js"
  
  const ProductsRouttes = Router()
  
  
  ProductsRouttes.get("/products", listProducts)
  ProductsRouttes.post("/products", validateSchema(ProductsSchema), createProduct)
  ProductsRouttes.get("/products/:id",  getProductById)
  ProductsRouttes.delete("/products/:id", deleteProduct)
  
  export default ProductsRouttes