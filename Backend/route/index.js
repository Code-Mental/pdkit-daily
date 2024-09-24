const express=require("express")
const router=express.Router();
const productRouter=require("./productRouter")
const categoryRouter=require("./categoryRouter")
const SubcategoryRouter=require("./subcategoryRouter")
const userRouter=require("./userRouter")
const product1Router=require("./product1Router")
const AddProductRouter=require("./AddProductRouter")


router.use("/product",productRouter)
router.use("/category",categoryRouter)
router.use("/subcategory",SubcategoryRouter)
router.use("/user",userRouter)
router.use("/product1",product1Router)
router.use("/addproduct",AddProductRouter)


module.exports=router;