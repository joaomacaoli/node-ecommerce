import { Router } from "express";

import ProductController from "../controllers/ProductController.js"

const productRouter = Router()

const productController = new ProductController()

productRouter.get('/', productController.read)
productRouter.get('/count', productController.count)
productRouter.get('/featured/:count', productController.featured)
// productRouter.get('/', productController.readAllWithoutId)
// productRouter.get('/', productController.readAllAndShowOnlyNameImage)
productRouter.get('/:id', productController.readById)
productRouter.post('/', productController.create)
productRouter.put('/:id', productController.update)
productRouter.delete('/:id', productController.delete)

export default productRouter
