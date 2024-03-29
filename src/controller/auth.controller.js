const authModel = require("../model/auth.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const { JWT_PRIVATE_KEY } = process.env

const authController = {
    login: (req, res) => {
        return authModel.login(req.body)
            .then((result) => {
                jwt.sign({ id: result.id, role: result.role }, JWT_PRIVATE_KEY, (err, token) => {
                    return res.status(200).send({
                        message: "success", data: {
                            token,
                            user: { id: result.id, username: result.username, role: result.role }
                        }
                    })
                })
            }).catch((error) => {
                return res.status(400).send({ message: error })
            })
    },
    register: (req, res) => {
        if (req.body.password.length < 8) {
            return res.status(401).send({ message: "PASSWORD NOT SCURED" })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({ message: error })
                } else {
                    const request = {
                        ...req.body,
                        password: hash
                    }
                    console.log("request dong", request);
                    return authModel.register(request)
                        .then((result) => {
                            return res.status(201).send({ message: "succes", data: result })
                        }).catch((error) => {
                            return res.status(400).send({ message: error })
                        })
                }
            });
        }
    },

}


module.exports = authController