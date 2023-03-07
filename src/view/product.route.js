
const express = require("express");
const productRouter = express();
const formUpload = require ("../../helper/multer")
const verifyToken = require ("../../helper/verifyToken")


const productController = require('../controller/product.controller')

productRouter.get('/', productController.get)
productRouter.get('/:id', productController.getById)
// productRouter.post('/', verifyToken,productController.add)
// productRouter.patch('/:id',verifyToken, productController.update)
productRouter.post('/',verifyToken, formUpload.array('image'), productController.add)
productRouter.patch('/:id',verifyToken, formUpload.array('image'), productController.update)
productRouter.put('/:id',verifyToken, formUpload.array('image'), productController.update)
productRouter.delete('/:id',verifyToken, productController.remove)




module.exports = productRouter