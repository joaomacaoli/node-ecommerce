import { model, Schema } from 'mongoose'

const orderSchema = new Schema({
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
})

orderSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

orderSchema.set('toJSON', { virtuals: true })

const OrderModel = model('Order', orderSchema)

export default OrderModel

/*
Order Example:
{
  "orderItems": [
    {
      "quantity": 3,
      "product": "6638ac6c871ce76fea0498b5"
    },
    {
      "quantity": 2,
      "product": "6638af494a2ee58b6e2bd2f1"
    }
  ],
  "shippingAddress1": "Flowers Street , 45",
  "shippingAddress2": "1-B",
  "city": "Prague",
  "zip": "00000",
  "country": "Czech Republic",
  "phone": "+420702241333",
  "user": "663ebedd2dbc063de6c4d29e"
}
*/
