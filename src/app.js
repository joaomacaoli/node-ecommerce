import express from 'express'
import routes from "./routes/index.js";
import mongo from "./db/mongo.js";

const app = express()

app.use(express.json())
app.use(routes);

const port = process.env.PORT
const message = `You are logged!`

app.listen(port, () => {
  console.log(message)
})
