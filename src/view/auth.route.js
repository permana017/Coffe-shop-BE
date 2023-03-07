const express = require("express");
const authRouter = express();


const authController = require('../controller/auth.controller')

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)





module.exports = authRouter