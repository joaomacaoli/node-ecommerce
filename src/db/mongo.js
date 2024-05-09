import mongoose from 'mongoose'

const mongo = mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Database connection is ready...')
  })
  .catch((err) => {
    console.log(err)
  })

export default mongo
