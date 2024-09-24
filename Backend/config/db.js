const mongoose =require("mongoose")

const connectDb=async(req,res)=>{
    await mongoose.connect("mongodb://localhost:27017/pdkit")
    console.log("Mongodb connected")
}

module.exports=connectDb; 