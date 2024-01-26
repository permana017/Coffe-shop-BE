const cloudinary = require("./cloudinary");

const deletImages = (publicIdToDelete) => {
    cloudinary.uploader.destroy(publicIdToDelete, (error, result) => {
        if (error) {
            console.error('Error deleting image:', error.message);
        } else {
            console.log('Image deleted successfully:', result);
        }
    });
}

module.exports = deletImages