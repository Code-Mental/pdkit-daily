const AddProduct = require("../model/AddProduct.model");

// Function to add a product
exports.addproduct = async (req, res) => {
    try {
        console.log(req.body);

        // Check if an image was uploaded and set the image field
        if (req.file) {
            req.body.image = req.file.filename; // Store the filename or path
        }

        const product = await AddProduct.create(req.body);
        res.json({ status: 200, success: true, message: "Product Created Successfully!", product });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ status: 500, success: false, message: "Failed to create product." });
    }
};

// Function to fetch all products
exports.index = async (req, res) => {
    try {
        const addproduct = await AddProduct.find();
        res.json({ status: 200, success: true, message: "Products Fetched Successfully!", addproduct });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ status: 500, success: false, message: "Failed to fetch products." });
    }
};

// Function to update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the URL

    try {
        // Check if an image was uploaded and set the image field
        if (req.file) {
            req.body.image = req.file.filename; // Store the filename or path
        }

        // Find the product by ID and update it with the request body
        const updatedProduct = await AddProduct.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Ensure validation on update
        });

        // If the product isn't found, return a 404 error
        if (!updatedProduct) {
            return res.status(404).json({ status: 404, success: false, message: "Product not found" });
        }

        // Return the updated product
        res.json({ status: 200, success: true, message: "Product updated successfully!", product: updatedProduct });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ status: 500, success: false, message: "Failed to update product." });
    }
};

// Function to delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the URL

    try {
        const deletedProduct = await AddProduct.findByIdAndDelete(id);

        // If the product isn't found, return a 404 error
        if (!deletedProduct) {
            return res.status(404).json({ status: 404, success: false, message: "Product not found" });
        }

        // Return a success message
        res.json({ status: 200, success: true, message: "Product deleted successfully!" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ status: 500, success: false, message: "Failed to delete product." });
    }
};
