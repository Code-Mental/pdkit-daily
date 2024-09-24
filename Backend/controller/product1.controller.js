const Product1 = require("../model/product1.model")
const AddProduct = require("../model/AddProduct.model")


exports.product1 = async (req, res) => {
    try {
        console.log(req.body)
        // console.log(req.file);
        // req.body.productImage=req.file.filename;
        const product = await Product1.create(req.body)
        res.json({ status: 200, success: true, message: "Product Created Successfully!" })
    }
    catch (err) {
        console.log(err)
    }
}
exports.index = async (req,res) => {
    try {
        const products = await Product1.find()
        res.json({ status: 200, success: true, message: "Products Fetched Successfully!", products })
    }
    catch (err) {
        console.log(err)
    }
}

exports.get = async (req,res) => {
    try {
        const {title}=req.query;
        const product = await AddProduct.findOne({product_name:title})
        res.json({ status: 200, success: true, message: "Product Fetched Successfully!", product })
    }
    catch (err) {
        console.log(err)
    }
}


