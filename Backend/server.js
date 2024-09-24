const express=require("express")
const app=express();
const PORT=8083
const connectDb=require("./config/db")
const route=require("./route/index")
const cors=require("cors")
app.use(express.json())
app.use(cors())
connectDb();
app.use("/api/admin",route)
const path=require("path")

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.get("/",(req,res)=>{
res.json("hello from server")
})
app.listen(PORT,()=>{
console.log(`server is running on${PORT}`)
})