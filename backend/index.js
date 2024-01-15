const express=require("express")
const {connection}=require("./db")

const app=express();

app.use(expree.json());

app.listen(8000,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
        console.log("Server is running at port 8000")
    } catch (error) {
     console.log(error.message)   
    }
})