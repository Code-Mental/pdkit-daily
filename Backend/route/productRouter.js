const express=require("express")
const router=express.Router();
const controller=require("../controller/product.controller")
const multer=require("multer")
const path=require("path")


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        console.log(file)
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage,
    limits:{fileSize:1000000}
})


router.post("/",upload.single("productImage"),controller.store)
router.get("/",controller.index)
router.get("/:id",controller.get)
// // router.put("/:id",controller.update)

router.delete("/:id",controller.destroy)





module.exports=router;