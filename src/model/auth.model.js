const db = require("../../helper/connection")
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


const authModel = {
    login:({username, password, phone, email})=> {
        return new Promise((resolve, reject)=> {
            db.query(
                `SELECT * from users WHERE email=$1`, [email],
                (err, result) => {
                if(err) return reject(err.message)
                if(result.rows.length == 0 ) return reject('email or password not valid')
                bcrypt.compare(password, result.rows[0].password, 
                    function(err, hashingResult) {
                      if(err) return reject(err.message)
                      if(!hashingResult) return reject("NOT_FOUND")
                      return resolve(result.rows[0])
                  });
                }
              );
        })
    },
    register:({username, password, email, phone})=>{
        console.log({username, password, email, phone});
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (id, username, password, email, phone) VALUES ($1, $2, $3, $4, $5)`,
                [uuidv4(), username, password, email, phone],
                (err, result) => {
                    if (!err) {
                        return resolve("ADD_SUCCESS");
                    } else {
                        if (err.code == 23505) {
                            return reject("username or email already exist");
                            } else {
                            return resolve("ADD_SUCCESS");
                            }
                    }
                }
            );
        })
    },
}


module.exports = authModel