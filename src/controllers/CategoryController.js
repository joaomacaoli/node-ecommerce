import CategoryModel from '../models/CategoryModel.js'

export default class CategoryController {
  constructor() {}

  async read(request, response) {
    const categoryList = await CategoryModel.find()

    if (!categoryList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(categoryList)
  }

  async readById(request, response) {
    const id = request.params.id
    const category = await CategoryModel.findById(id)

    if (!category) {
      response
        .status(500)
        .json({ message: 'The category with the given ID was not found' })
    }

    response.status(200).send(category)
  }

  async create(request, response) {
    const { name, icon, color } = request.body

    const newCategory = new CategoryModel({
      name,
      icon,
      color,
    })

    const category = await newCategory.save()

    !category
      ? response.status(404).send('The category cannot be created')
      : response.send(category)
  }

  async delete(request, response) {
    const id = request.params.id

    CategoryModel.findByIdAndDelete(id)
      .then((category) => {
        if (category) {
          return response
            .status(200)
            .json({ success: true, message: 'the category is deleted!' })
        } else {
          return response
            .status(404)
            .json({ success: false, message: 'category not found!' })
        }
      })
      .catch((err) => {
        return response.status(500).json({ success: false, error: err })
      })
  }

  async update(request, response) {
    const id = request.params.id
    const { name, icon, color } = request.body

    const category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        color,
      },
      { new: true }
    )

    !category
      ? response.status(404).send('The category cannot be created')
      : response.send(category)
  }
}
