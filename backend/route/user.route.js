const express=require("express")

const {UserModel}=require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
let {email,password}=req.body;
try {
    let user=await UserModel.findOne({email})
    if(user){return res.status(200).send({msg:"User already exist, please login"})}
    
    const passwordHash=await bcrypt.hash(password,5);

    let newUser=new UserModel({...req.body,password:passwordHash})
    await newUser.save();
    res.status(200).send({msg:"New User Added"})
} catch (error) {
    res.status(400).send({error:error.message})
}
})

userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email})
        if(!user){return res.status(200).send({msg:"User does not exist, please register..."})};

        let match=await bcrypt.compare(password,user.password);
        if(!match){return res.status(200).send({msg:"Check Password..."})}

        var token = jwt.sign({ userID:user._id }, 'user',{ expiresIn: "7d" });

        res.status(200).send({msg:"Login Successfull!",token})

    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

module.exports={
    userRouter
}