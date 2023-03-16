const userModel = require("../model/users.model")
const { unlink } = require('node:fs');


const userController = {
    get:(req, res)=> {
        return userModel.get(req.query)
        .then((result)=> {
            return res.status(200).send({ message: "success", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    },
    getById:(req,res)=> {
        const {id} = req.params
        return userModel.getById(id)
        .then((result)=> {
            return res.status(201).send({ message: "success", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error})
        })
    },
    add:(req, res)=> {
        return userModel.add(req.body)
        .then((result)=> {
            return res.status(201).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    },
    update:(req, res)=> {
        const id = req.params.id
        // console.log("haiiii",result[0].img);
        return userModel.update(req, id)
        .then((result) => {
            console.log("result imagessss",result[0].img);
            if (result[0].img != null){
                if (typeof req.file !== "undefined" ) {
                    unlink(`public/upload/images/${result[0].img}`, (err) => {
                        if (err) throw err;
                    });
                } else {
                    return res.status(201).send({ message: `Successfully update data id=${id}`}) 
                }
            }
            return res.status(201).send({ message: `Successfully update data id=${id}`})
        }).catch((error)=> {
            return res.status(500).send({ message: "updates failed" })
        })
    },
    remove:(req, res)=> {
        return userModel.remove(req.params.id)
        .then((result)=> {
            return res.status(201).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        }) 
    }, 
}


module.exports = userController