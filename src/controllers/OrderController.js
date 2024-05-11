import OrderModel from '../models/OrderModel.js'
import OrderItemModel from '../models/OrderItemModel.js'

export default class OrderController {
  constructor() {}

  async read(request, response) {
    const orderList = await OrderModel.find()

    if (!orderList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(orderList)
  }

  async readById(request, response) {
    const id = request.params.id
    const order = await OrderModel.findById(id)

    if (!order) {
      response
        .status(500)
        .json({ message: 'The order with the given ID was not found' })
    }

    response.status(200).send(order)
  }

  async create(request, response) {
    const orderItemsIds = Promise.all(
      request.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItemModel({
          quantity: orderItem.quantity,
          product: orderItem.product,
        })

        newOrderItem = await newOrderItem.save()

        return newOrderItem._id
      })
    )

    const orderItemsIdsResolved = await orderItemsIds

    const {
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      totalPrice,
      user,
    } = request.body

    const newOrder = new OrderModel({
      orderItems: orderItemsIdsResolved,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      totalPrice,
      user,
    })

    const order = await newOrder.save()

    !order
      ? response.status(404).send('The order cannot be created')
      : response.send(order)
  }

  async delete(request, response) {
    const id = request.params.id

    OrderModel.findByIdAndDelete(id)
      .then((order) => {
        if (order) {
          return response
            .status(200)
            .json({ success: true, message: 'the order is deleted!' })
        } else {
          return response
            .status(404)
            .json({ success: false, message: 'order not found!' })
        }
      })
      .catch((err) => {
        return response.status(500).json({ success: false, error: err })
      })
  }

  async update(request, response) {
    const id = request.params.id
    const { name, icon, color } = request.body

    const order = await OrderModel.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        color,
      },
      { new: true }
    )

    !order
      ? response.status(404).send('The order cannot be created')
      : response.send(order)
  }
}
