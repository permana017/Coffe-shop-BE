require('dotenv').config();

const {urlencoded, json} = require('express')
const express = require('express')
const app = express()
const router = require('./src/view/index')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const db = require("./helper/connection")

app.use(express.static('public'))
app.use(urlencoded({extended: true}))
app.use(cors());
app.use(json())


app.use('/api/v1', router)



app.get("*", (req, res) => {
    return res.send({status: 404, message: "not founds"});
});


const port = 5000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})