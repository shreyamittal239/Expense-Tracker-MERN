const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "ExpenseTracker/ProfileImages",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({
    storage,
})

 console.log("Cloudinary Config:");
console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);


module.exports = upload;