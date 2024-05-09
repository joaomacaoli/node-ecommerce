import { Router } from "express";

import CategoryController from "../controllers/CategoryController.js"

const categoryRouter = Router()

const categoryController = new CategoryController()

categoryRouter.get('/', categoryController.read)
categoryRouter.get('/:id', categoryController.readById)
categoryRouter.post('/', categoryController.create)
categoryRouter.put('/:id', categoryController.update)
categoryRouter.delete('/:id', categoryController.delete)

export default categoryRouter
