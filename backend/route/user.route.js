const express=require("express")

const {UserModel}=require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
let {email,password}=req.body;
try {
    let user=await UserModel.find({email})
    if(user){return res.status(200).send({msg:"User already exist, please login"})}

    let passwordReg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$/;
    if(!(passwordReg.test.password)){return res.status(200).send({msg:"Password must contain atleast 1 uppercase, 1 lowercase, 1 digit , 1 special character and must be atleast 8 character long"})}
    
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
        let user=await UserModel.find({email})
        if(!user){return res.status(200).send({msg:"User does not exist, please register..."})};

        let match=await bcrypt.compare(password.user.password);
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