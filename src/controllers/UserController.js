import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class UserController {
  constructor() {}

  async read(request, response) {
    const userList = await UserModel.find().select('-passwordHash')

    if (!userList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(userList)
  }

  async readAllAndShowOnlyNameEmailPhone(request, response) {
    const userList = await UserModel.find().select('name email phone')

    if (!userList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(userList)
  }

  async readById(request, response) {
    const id = request.params.id
    const userList = await UserModel.findById(id).select('-passwordHash')

    if (!userList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(userList)
  }

  async create(request, response) {
    const {
      name,
      email,
      password,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    } = request.body

    const newUser = new UserModel({
      name,
      email,
      passwordHash: bcrypt.hashSync(
        password,
        parseInt(process.env.HASH_SECRET)
      ),
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    })

    const user = await newUser.save()

    !user
      ? response.status(404).send('The user cannot be created')
      : response.send(user)
  }

  async login(request, response) {
    const userEmail = request.body.email

    const user = await UserModel.findOne({ email: userEmail })

    if (!user)
      return response.status(400).json({ message: 'Wrong credentials' })

    const userPassword = request.body.password
    const userPasswordHash = user.passwordHash
    const comparePassword = bcrypt.compareSync(userPassword, userPasswordHash)
    const jwtSecret = toString(process.env.JWT_TOKEN)

    if (user && comparePassword) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        jwtSecret,
        {
          expiresIn: '1d',
        }
      )

      response.status(200).json({ user: user.email, token })
    } else {
      response.status(400).json({ message: 'Wrong credentials' })
    }
  }
}
