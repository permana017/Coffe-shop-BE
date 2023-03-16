const db = require("../../helper/connection")
const { v4: uuidv4 } = require('uuid');


const productModel = {
    query: (queryParams, sortType = 'asc', limit = 12, offset = 0 ) => {
        if (queryParams.search && queryParams.cat) {
            return `WHERE tittle LIKE '%${queryParams.search}%' AND category LIKE '%${queryParams.cat}%' ORDER BY tittle ${sortType} LIMIT ${limit} OFFSET ${offset}`;
        } else if (queryParams.search || queryParams.cat) {
            return `WHERE tittle LIKE '%${queryParams.search}%' OR category LIKE '%${queryParams.cat}%' ORDER BY tittle ${sortType} LIMIT ${limit} OFFSET ${offset}`;
        } else {
            return `ORDER BY tittle ${sortType} LIMIT ${limit} OFFSET ${offset}`;
        }

    },


    get: function (queryParams) {
        // console.log(queryParams)
        const {page=1, limit= 12, search='', cat=""} = queryParams
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT
                products.id, products.tittle, products.price, products.description, products.category,
                json_agg(row_to_json(product_images)) images
                FROM products
                INNER JOIN product_images ON products.id=product_images.product_id
                WHERE tittle ILIKE '%${search}%' AND category ILIKE '${cat}%' 
                GROUP BY products.id LIMIT ${limit} OFFSET (${page}-1)*${limit}`,
                // `SELECT * from products ${this.query(queryParams, queryParams.sortBy, queryParams.limit, queryParams.offset)}`,
                (err, result) => {
                  if (err) {
                    return reject (err.message)
                  } else {
                    return resolve (result.rows);
                  }
                }
              ); 
        })
    },


    getById:(id, body)=> {
        return new Promise((resolve, reject)=> {           
                db.query(
                    `SELECT * from products WHERE id='${id}'`,
                    (err, result) => {
                      // console.log(result.rows)
                      if (err) {
                        return reject(err.message)
                      }else {
                        return resolve(result.rows[0])
                      }
                    }
                  );
        })
    },
    add:({tittle, price, image, category,description, file})=>{
      // console.log(image)
            return new Promise((resolve, reject) => {
                if(tittle == '' || typeof tittle == "undefined" ){
                  return reject ('data ada yang kosong ');
                }else if(price == ''  || typeof price == "undefined"){
                    return reject ('data ada yang kosong');
                // }else if(category == '' || typeof category == "undefined"){
                //     return reject ('data ada yang kosong');
                // }else if(image == '' ){
                //     return reject ('data ada yang kosong');
                }
                else{
                    db.query(
                        `INSERT INTO products (id, tittle, price, img, category, description) VALUES ('${uuidv4()}','${tittle}','${price}','${image}','${category}','${description}') RETURNING id`,
                        (err, result) => {
                            // console.log(result);
                            if (err) {
                                return reject (err.message);
                            } else {
                                for (let index = 0; index < file.length; index++) {
                                    db.query(`INSERT INTO product_images (image_id, product_id, name, filename) VALUES($1, $2 ,$3 , $4)`,[uuidv4(), result.rows[0].id, tittle,file[index].filename])
                                  }
                                return resolve ({tittle, price,category,description, image: file});
                            }
                        }
                    );
                }
            })
        },


    update:({id, tittle, price, image, category, description, file})=>{
            return new Promise((resolve, reject) => {
                return db.query(`SELECT * FROM products WHERE id='${id}'`,(err, result)=>{
                    if(err) {
                        return res.status(500).send({ message: err.message });
                    }else {
                        db.query(
                          `UPDATE products SET tittle='${tittle || result.rows[0].tittle}', description='${description || result.rows[0].description}', price='${price || result.rows[0].price}',img='${image || result.rows[0].image}', category='${category || result.rows[0].category}' WHERE id='${id}'`,
                            (err, result) => {

                              if (err) {
                                return reject(err.message);
                              } else {
                                // console.log(typeof file == "undefined");
                                if(file.length <= 0) return resolve({id, tittle, price, category, description})
                                db.query(`SELECT image_id, filename FROM product_images WHERE product_id='${id}'`, (errProductImages, productImages)=>{
                                  if(err) return reject ({message: errProductImages})
                                  console.log(productImages.rows);
                                    for (let indexNew = 0; indexNew < file.length; indexNew++) {
                                      db.query(`UPDATE product_images SET filename=$1 WHERE image_id=$2`,[file[indexNew].filename, productImages.rows[indexNew].image_id], (err, result)=> {
                                        if(err) return reject({message: "image gagal dihapus"})
                                        return resolve({id, tittle, price, category,description, oldImages: productImages.rows, images: image})
                                      })
                                    }
                                })
                              }
                            } 
                          );
                    }
                })
                
            })
    },
    remove:(id)=>{
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from products WHERE id='${id}'`,
                (err, result) => {
                  if (err) {
                    return reject (err.message);
                  } else {
                    db.query(`DELETE FROM product_images WHERE product_id='${id}' RETURNING filename`, (err, result)=>{
                      if(err) return reject({message:'gambar gagal dihapus'})
                      return resolve(result.rows)
                    })
                  }
                }
              );  
        })
    },
}


module.exports = productModel