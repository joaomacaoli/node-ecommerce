import CategoryModel from '../models/CategoryModel.js'
import ProductModel from '../models/ProductModel.js'
import { isValidObjectId } from 'mongoose'

export default class ProductController {
  constructor() {}

  async read(request, response) {
    let filter = {}

    if (request.query.categories) {
      filter = { category: request.query.categories.split(',') }
    }

    const productList = await ProductModel.find(filter).populate('category')

    if (!productList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(productList)
  }

  async readAllWithoutId(request, response) {
    const productList = await ProductModel.find().select('-_id')

    if (!productList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(productList)
  }

  async readAllAndShowOnlyNameImage(request, response) {
    const productList = await ProductModel.find().select('name image')

    if (!productList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(productList)
  }

  async readById(request, response) {
    const productId = request.params.id
    const product = await ProductModel.findById(productId)

    if (!product) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(product)
  }

  async create(request, response) {
    const {
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = request.body

    const categoryExists = await CategoryModel.findById(category)
    if (!categoryExists) return response.status(400).send('Invalid Category')

    const newProduct = new ProductModel({
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    })

    const product = await newProduct.save()

    if (!product)
      return response.status(500).send('The product cannot be created')

    response.send(product)
  }

  async delete(request, response) {
    const id = request.params.id

    ProductModel.findByIdAndDelete(id)
      .then((product) => {
        if (product) {
          return response
            .status(200)
            .json({ success: true, message: 'the product is deleted!' })
        } else {
          return response
            .status(404)
            .json({ success: false, message: 'product not found!' })
        }
      })
      .catch((err) => {
        return response.status(500).json({ success: false, error: err })
      })
  }

  async update(request, response) {
    const id = request.params.id

    if (!isValidObjectId(id))
      return response.status(400).json({ message: 'Invalid produt id!' })

    const {
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = request.body

    const categoryExists = await CategoryModel.findById(category)
    if (!categoryExists) return response.status(400).send('Invalid Category')

    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      },
      { new: true }
    )

    !product
      ? response.status(404).send('The product cannot be updated!')
      : response.send(product)
  }

  async count(request, response) {
    const productCount = await ProductModel.countDocuments()

    if (!productCount) {
      response.status(500).json({ success: false })
    }

    response.status(200).json({ total: productCount })
  }

  async featured(request, response) {
    const count = request.params.count ? request.params.count : 0
    const products = await ProductModel.find({ isFeatured: true }).limit(
      parseInt(count)
    )

    if (!products) {
      response.status(500).json({ success: false })
    }

    response.status(200).json({ total: products })
  }
}
