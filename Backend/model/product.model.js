const mongoose = require("mongoose")

// const VariationSchema=mongoose.Schema({
//     color:{
//         type:String
//     },
//     price:{
//         type:Number
//     },
//     size:{
//         type:String
//     }
// })

const productSchema = mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number
    },
    
    quantity: {
        type: Number
    },
    productImage:{
        type:String
    },
    colour: {
        type: Number
    },
    
    category: {
        type:mongoose.Schema.Types.ObjectId,

        ref:"Category" 
    
    },
    subcategory: {
        type:mongoose.Schema.Types.ObjectId,

        ref:"Subcategory" 
    
    },
    
})
module.exports = mongoose.model("Product", productSchema)   