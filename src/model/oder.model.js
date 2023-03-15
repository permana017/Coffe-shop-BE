  const db = require("../../helper/connection")
const { v4: uuidv4 } = require('uuid');


const orderModel = {


    query: (queryParams, sortType = 'asc', limit = 25, offset = 0 ) => {
        if (queryParams.search) {
            return `WHERE title LIKE '%${queryParams.search}%' ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`;
        } else if (queryParams.search) {
            return `WHERE title LIKE '%${queryParams.search}%' ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`;
        } else {
            return `ORDER BY order_id ${sortType} LIMIT ${limit} OFFSET ${offset}`;
        }

    },


    get: function (queryParams) {
        console.log(queryParams)
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from orders
                ${this.query(queryParams, queryParams.sortBy, queryParams.limit, queryParams.offset)}`,
                (err, result) => {
                    console.log(result);
                  if (err) {
                    return reject (err.message)
                  } else {
                  return resolve (result.rows);
                  }
                }
              ); 
        })
    },


    getById:(user_id)=> {
      console.log("id param", user_id)
        return new Promise((resolve, reject)=> {
            db.query(
                `SELECT * from orders WHERE user_id='${user_id}'`,
                (err, result) => {
                  if (err) {
                    return reject(err.message)
                  } else {
                    return resolve(result.rows)
                  }
                }
              );
        })
    },


    add:({user_id, product_id, title, price, size,qty, img})=>{
      // console.log(user_id, product_id, title, price, size,qty, img);
      console.log(uuidv4());
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO orders (order_id, user_id, product_id, title, price, size, qty, img) VALUES ($1, $2,$3,$4,$5,$6,$7, $8)`,
                [uuidv4(), user_id, product_id,title,price,size,qty, img],
                (err, result) => {
                    if (err) {
                        return reject (err.message);
                    } else {
                        return resolve ({user_id, product_id, title, price, size,qty, img});
                    }
                }
            );
        })
    },

    remove:(id)=>{
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from orders WHERE order_id='${id}'`,
                (err, result) => {
                  if (err) {
                    return reject (err.message);
                  } else {
                    return resolve ("success delete");
                  }
                }
              );  
        })
    },
}


module.exports = orderModel