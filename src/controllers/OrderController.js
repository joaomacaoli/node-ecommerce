import OrderModel from '../models/OrderModel.js'
import OrderItemModel from '../models/OrderItemModel.js'

export default class OrderController {
  constructor() {}

  async read(request, response) {
    const orderList = await OrderModel.find()
      .populate('user', 'name')
      .sort({ dateOrdered: -1 })

    if (!orderList) {
      response.status(500).json({ success: false })
    }

    response.status(200).json(orderList)
  }

  async readById(request, response) {
    const id = request.params.id
    const order = await OrderModel.findById(id)
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          populate: 'category',
        },
      })

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

    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItemModel.findById(orderItemId).populate(
          'product',
          'price'
        )
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice
      })
    )

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

    const {
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
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
      .then(async (order) => {
        if (order) {
          await order.orderItems.map(async (orderItem) => {
            await OrderItemModel.findOneAndDelete(orderItem)
          })
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
    const { status } = request.body

    const order = await OrderModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    )

    !order
      ? response.status(404).send('The order cannot be created')
      : response.send(order)
  }

  async totalSales(request, response) {
    const totalSales = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalsales: {
            $sum: '$totalPrice',
          },
        },
      },
    ])

    if (!totalSales) {
      return response.status(400).send('The order sales cannot be generated')
    }

    response.send({ totalsales: totalSales.pop().totalsales })
  }

  async count(request, response) {
    const orderCount = await OrderModel.countDocuments((count) => count)

    if (!orderCount) {
      response.status(500).json({ success: false })
    }
    response.send({
      orderCount: orderCount,
    })
  }

  async usersOrders(request, response) {
    const userOrderList = await OrderModel.find({ user: request.params.userid })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          populate: 'category',
        },
      })
      .sort({ dateOrdered: -1 })

    if (!userOrderList) {
      response.status(500).json({ success: false })
    }
    response.send(userOrderList)
  }
}
