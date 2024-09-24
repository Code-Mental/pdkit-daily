const Subcategory=require("../model/subcategory.model")

exports.subcategory=async(req,res)=>{
    try{
        const Subcategories=await Subcategory.create(req.body)
        res.json({status:200,success:true,message:"SubCategory Created Successfully!"})
    }
    catch(err){
        console.log(err)
    }

}



exports.index=async(req,res)=>{
    try{
        const {categoryId,color}=req.query;
        console.log(categoryId)

        const query ={};
        if(categoryId){
            query.categoryId=categoryId;
        }
        if(color){
            query.color=color;
        }
        const subcategory=await Subcategory.find(query)
        res.json({status:200,success:true,message:"SubCategory Fetched Successfully!",subcategory})
    }
    catch(err){
        console.log(err)
    }

}



// exports.indexxx = async (req, res) => {
//     try {
//         const subcategories = await Subcategory.find().populate({ path: "category", select: "-_id name " })
//         console.log(subcategories)
//         res.json({ status: 200, success: true, message: "Products Fetched Successfully!", subcategories })
//     }
//     catch (err) {
//         console.log(err)
//     }

// }