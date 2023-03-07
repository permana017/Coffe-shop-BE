const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload/images/')
    },
    filename: function (req, file, cb) {
        console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
  })
  
  const formUpload = multer({
     storage: storage,

    })


module.exports = formUpload