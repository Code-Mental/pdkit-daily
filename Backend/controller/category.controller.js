const Category=require("../model/category.model")

exports.storee=async(req,res)=>{
    try{
        console.log(req.body);

        req.body.categoryImage=req?.file?.filename;

        const category=await Category.create(req.body)
        res.json({status:200,success:true,message:"Category Created Successfully!"})
    }
    catch(err){
        console.log(err)
    }

}

exports.index=async(req,res)=>{
    try{
        const category=await Category.find().sort({createdAt:-1})
        res.json({status:200,success:true,message:"Category Fetched Successfully!",category})
    }
    catch(err){
        console.log(err)
    }

}

