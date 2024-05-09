import { Router } from 'express'

import categoryRouter from './category.routes.js'
import productRouter from './product.routes.js'
import userRouter from './user.routes.js'

const routes = Router()
const api = process.env.API_URL

routes.use(`${api}/categories`, categoryRouter)
routes.use(`${api}/products`, productRouter)
routes.use(`${api}/users`, userRouter)

export default routes
