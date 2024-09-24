const express=require("express")
const router=express.Router();
const controller=require("../controller/user.controller")

router.post("/",controller.user)
router.post("/login",controller.login)


module.exports=router;