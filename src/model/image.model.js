const db = require("../../helper/connection")
const { v4: uuidv4 } = require('uuid');


const imageModel = {
    upload:({file, id})=>{
        return new Promise((resolve, reject) => {
          db.query(`INSERT INTO product_images (image_id, product_id, name, filename) VALUES($1, $2 ,$3 , $4)`,
          [uuidv4(), id, result.rows[0].tittle,file[0].filename]);
          return resolve (file.filename);
            // db.query(
            //     `SELECT tittle FROM products WHERE VALUES product_id=$1`,[id],
            //     (err, result) => {
            //         // console.log(result);
            //         if (err) {
            //             return reject (err.message);
            //         } else {
            //             db.query(`INSERT INTO product_images (image_id, product_id, name, filename) VALUES($1, $2 ,$3 , $4)`,
            //             [uuidv4(), id, result.rows[0].tittle,file[0].filename]);
            //             return resolve (file.filename);
            //         }
            //     }
            // )
        })
    },
    edit:({file, id})=>{
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT filename FROM products WHERE image_id="${id}"`,
                (err, result) => {
                    // console.log(result);
                    if (err) {
                        return reject (err.message);
                    } else {
                        db.query(`UPDATE product_images SET filename=$1 WHERE image_id=$2`,
                        [file.filename, id])
                        return resolve ({oldImage: result.rows[0].filename, images: file.filename});
                    }
                }
            );
        })
    },
    
    delete:(id)=>{
      return new Promise((resolve, reject) => {
        db.query(`DELETE FROM product_images WHERE image_id='${id}' RETURNING filename`, (err, result)=>{
          if(err) return reject({message:'gambar gagal dihapus'})
          return resolve(result.rows[0].filename)
        })
      })
  },
}


module.exports = imageModel
