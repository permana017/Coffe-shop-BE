const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryUpload = require("./cloudinary");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/upload/images/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, `${new Date().getTime()}-${file.originalname}`)
//   }
// })

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    folder: "coffeShop",
    format: async (req, file) => "png",
    public_id: (req, file) => new Date().getTime(),
  },
});

const formUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let formatType = path.extname(file.originalname);
    if (
      formatType == ".png" ||
      formatType == ".jpg" ||
      formatType == ".jpeg" ||
      formatType == ".webp"
    ) {
      cb(null, true);
    } else {
      cb("image not valid", false);
    }
  },
  limits: {
    fileSize: 1048576 * 10, //10 mb
  },
});

module.exports = formUpload;
