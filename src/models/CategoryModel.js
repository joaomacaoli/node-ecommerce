import { model, Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
})

const CategoryModel = model('Category', categorySchema)

export default CategoryModel
