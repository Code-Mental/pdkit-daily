const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controller/Addproduct.controller");

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Appends timestamp to file name
    },
});

const upload = multer({ storage });

// Route to add a product with image upload
router.post("/", upload.single('image'), controller.addproduct);

// Route to fetch all products
router.get("/", controller.index);

// Route to update a product by ID with image upload
router.put("/:id", upload.single('image'), controller.updateProduct);

// Route to delete a product by ID
router.delete("/:id", controller.deleteProduct);

module.exports = router;
