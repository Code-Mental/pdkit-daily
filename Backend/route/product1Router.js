const express=require("express")
const router=express.Router();
const controller=require("../controller/product1.controller")



router.post("/",controller.product1)
router.get("/",controller.index)
router.get("/getProduct",controller.get)




module.exports=router;