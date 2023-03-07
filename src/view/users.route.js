

const express = require("express");
const userRouter = express();
const formUpload = require ("../../helper/multer")  


const userController = require('../controller/users.controller')

userRouter.get('/', userController.get)
userRouter.get('/:id', userController.getById)
userRouter.post('/', userController.add)
userRouter.patch('/:id',formUpload.single('img'), userController.update)
userRouter.delete('/:id', userController.remove)




module.exports = userRouter