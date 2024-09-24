const Product = require("../model/product.model")

exports.store = async (req, res) => {
    try {
        console.log(req.body)
        // console.log(req.file);
        // req.body.productImage=req.file.filename;
        const product = await Product.create(req.body)
        res.json({ status: 200, success: true, message: "Product Created Successfully!" })
    }
    catch (err) {
        console.log(err)
    }
}
exports.index = async (req,res) => {
    try {
        const products = await Product.find().populate({ path: "category", select: "-_id title description" }).populate({ path: "subcategory", select: "-_id name description" })
        res.json({ status: 200, success: true, message: "Products Fetched Successfully!", products })
    }
    catch (err) {
        console.log(err)
    }

}
exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        // variations:[{color:"red",price:11.59,size:"L"},{color:"red",price:11.59,size:"L"},]
        const product = await Product.findOne({ _id: id })
        if (!product) {
            return res.json({ status: 404, success: false, message: "Product not found" })
        }
        res.json({ status: 200, success: true, message: "Product Fetched Successfully!", product })
    }
    catch (err) {
        console.log(err)
    }

}

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const product = await Product.findOneAndDelete({ _id: id })
        if (!product) {
            return res.json({ status: 404, success: false, message: "Product not found" })
        }
        res.json({ status: 200, success: true, message: "Product Deleted Successfully!" })
    }
    catch (err) {
        console.log(err)
    }

}
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })
        if (!product) {
            return res.json({ status: 404, success: false, message: "Product not found" })
        }
        res.json({ status: 200, success: true, message: "Product Updated Successfully!" })
    }
    catch (err) {
        console.log(err)
    }

}