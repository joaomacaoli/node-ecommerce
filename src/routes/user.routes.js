import { Router } from "express";

import UserController from "../controllers/UserController.js"

const userRouter = Router()

const userController = new UserController()

userRouter.get('/', userController.read)
userRouter.get('/count', userController.count)
// userRouter.get('/', userController.readAllAndShowOnlyNameEmailPhone)
userRouter.get('/:id', userController.readById)
userRouter.post('/', userController.create)
userRouter.post('/login', userController.login)
userRouter.post('/register', userController.register)
// userRouter.put('/:id', userController.update)
userRouter.delete('/:id', userController.delete)

export default userRouter
