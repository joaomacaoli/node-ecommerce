import { model, Schema } from 'mongoose'

const orderItemSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
})

const OrderItemModel = model('OrderItem', orderItemSchema)

export default OrderItemModel
