const express = require("express");
const orderRouter = express();


const orderController = require('../controller/order.controller')

orderRouter.get('/', orderController.get)
orderRouter.get('/:id', orderController.getById)
orderRouter.post('/', orderController.add)
// orderRouter.patch('/:id', orderController.update)
orderRouter.delete('/:id', orderController.remove)




module.exports = orderRouter