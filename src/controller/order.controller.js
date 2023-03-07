const orderModel = require("../model/oder.model")


const orderController = {
    get:(req, res)=> {
        return orderModel.get(req.query)
        .then((result)=> {
            return res.status(200).send({ message: "success", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    },
    getById:(req,res)=> {
        return orderModel.getById(req.params.id)
        .then((result)=> {
            return res.status(200).send({ message: "success", data: result})
        }).catch((error)=> {
            return res.status(500).send({ message: error})
        })
    },
    add:(req, res)=> {
        // console.log(req.body);
        return orderModel.add(req.body)
        .then((result)=> {
            return res.status(201).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        })
    },
    // update:(req, res)=> {
    //     const request = {
    //         ...req.body,
    //         id: req.params.id,
    //     }
    //     return orderModel.update(request)
    //     .then((result)=> {
    //         return res.status(201).send({ message: "succes", data: result })
    //     }).catch((error)=> {
    //         return res.status(500).send({ message: error })
    //     })
    // },
    remove:(req, res)=> {
        return orderModel.remove(req.params.id)
        .then((result)=> {
            return res.status(201).send({ message: "succes", data: result })
        }).catch((error)=> {
            return res.status(500).send({ message: error })
        }) 
    }, 
}

// app.delete("/orders/:id", (req, res) => {
//   const {id} = req.params
//   db.query(
//     `DELETE from orders WHERE id='${id}'`,
//     (err, result) => {
//       if (err) {
//         return res.status(500).send({ message: err.message });
//       } else {
//         return res.status(201).send({ message: `success delete data ${id}`, data: {} });
//       }
//     }
//   );
// })

module.exports = orderController