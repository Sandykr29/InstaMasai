const express=require("express")
const {connection}=require("./db");
const { userRouter } = require("./route/user.route");
const { postRouter } = require("./route/post.route");
const {auth}=require("./middleware/auth.middleware")

const app=express();

app.use(express.json());
app.use("/users",userRouter)
app.use("/posts",auth,postRouter)

app.listen(8000,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
        console.log("Server is running at port 8000")
    } catch (error) {
     console.log(error.message)   
    }
})