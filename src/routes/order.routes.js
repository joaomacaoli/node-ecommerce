import { Router } from 'express'

import OrderController from '../controllers/OrderController.js'

const orderRouter = Router()

const orderController = new OrderController()

orderRouter.get('/', orderController.read)
orderRouter.get('/:id', orderController.readById)
orderRouter.get('/get/count', orderController.count)
orderRouter.get('/get/totalsales', orderController.totalSales)
orderRouter.get('/get/userorders/:userid', orderController.usersOrders)
orderRouter.post('/', orderController.create)
orderRouter.put('/:id', orderController.update)
orderRouter.delete('/:id', orderController.delete)

export default orderRouter
