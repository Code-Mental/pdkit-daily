const express=require("express")
const router=express.Router();
const controller=require("../controller/subcategory.controller")



router.post("/",controller.subcategory)
router.get("/",controller.index)




module.exports=router;