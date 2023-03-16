const productModel = require("../model/product.model")
const { unlink } = require('node:fs');
const { log } = require("node:console");

const productController = {
    get:(req, res)=> {
        return productModel.get(req.query)
        .then((result)=> {
            return res.status(200).send({ message: "success", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    },
    getById:(req,res)=> {
        const {id} = req.params
        const body = req.params
        return productModel.getById(id)
        .then((result)=> {
            return res.status(200).send({ message: "success", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error})
        })
    },
    add:(req, res)=> {
        const request = {
            ...req.body,
            file: req.files,
            // image: req.file.filename,
        }
        return productModel.add(request)
        .then((result)=> {
            return res.status(201).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    },
    update:(req, res)=> {
        const request = {
            ...req.body,
            id: req.params.id,
            file: req.files,
        }
        return productModel.update(request)
        .then((result)=> {
            if(typeof result.oldImages != "undefined"){
                if (typeof request.file != "undefined") {
                    for (let index = 0; index < result.oldImages.length; index++) {
                        unlink(`public/upload/images/${result.oldImages[index].filename}`, (err) => {
                            // if (err) throw err;
                            console.log(`successfully deleted ${result.oldImages[index].filename}`);
                        });
                    }
                }
                return res.status(201).send({ message: "succes", data: result })
            }
            return res.status(201).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    },
    remove:(req, res)=> {
        return productModel.remove(req.params.id)
        .then((result)=> {
            for (let index = 0; index < result.length; index++) {
                unlink(`public/upload/images/${result[index].filename}`, (err) => {
                    if (err) throw err;
                    console.log(`successfully deleted ${result[index].filename}`);
                });
            }
            return res.status(201).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        }) 
    }, 
}


module.exports = productController