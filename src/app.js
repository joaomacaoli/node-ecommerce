import express from 'express'
import routes from './routes/index.js'
import './db/mongo.js'
import authJwt from './helpers/jwt.js'
import errorHandler from './helpers/error-handler.js'

const app = express()

app.use(express.json())
app.use(authJwt())
app.use(errorHandler)
app.use(routes)

const port = process.env.PORT
const message = `You are logged!`

app.listen(port, () => {
  console.log(message)
})
