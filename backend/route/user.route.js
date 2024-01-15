const express=require("express")

const {UserModel}=require("../model/user.model")

const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
let {email,password}=req.body;
try {
    let user=await UserModel.find({email})
    if(user){return res.status(200).send({msg:"User already exist, please login"})}

    let password
    
} catch (error) {
    res.status(400).send({error:error.message})
}
})