const mongoose = require("mongoose");

const AddProductSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true, // Added required validation
    },
    category: {
        type: String,
        required: true, // Added required validation
    },
    subcategory: {
        type: String,
        required: true, // Added required validation
    },
    product_id: {
        type: String,
        required: true, // Added required validation
    },
    status: {
        type: Boolean,
        default: true
    },
    length: {
        type: Boolean,
        default: false
    },
    width: {
        type: Boolean,
        default: false
    },
    height: {
        type: Boolean,
        default: false
    },
    neck_girth: {
        type: Boolean,
        default: false
    },
    chest_girth: {
        type: Boolean,
        default: false
    },
    weight: {
        type: Boolean,
        default: false
    },
    image: {
        type: String, // New field for image path
        default: null, // Optional: default to null
    },
});

// Create and export the model
module.exports = mongoose.model("AddProduct", AddProductSchema);
