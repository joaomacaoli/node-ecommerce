import UserModel from '../models/UserModel.js'

export default class UserController {
  constructor() {}

  async read(request, response) {
    const userList = await UserModel.find()

    if (!userList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(userList)
  }

  // async create(request, response) {
  //   const { name, image, countInStock } = request.body

  //   const product = new UserModel({
  //     name,
  //     image,
  //     countInStock,
  //   })

  //   await product
  //     .save()
  //     .then((createdProduct) => {
  //       response.status(201).json(createdProduct)
  //     })
  //     .catch((err) => {
  //       response.status(500).json({
  //         error: err,
  //         success: false,
  //       })
  //     })
  // }
}
