const express=require("express")
const {PostModel}=require("../model/post.model")
const postRouter=express.Router();

postRouter.post("/add",async(req,res)=>{
    try {
        let post=new PostModel(req.body);
        await post.save();
        res.status(200).send({msg:"New post added..."})
    } catch (error) {
        res.status(200).send({error:error.message})
    }
})

postRouter.post("/",async(req,res)=>{
    try {
        let post =await PostModel.find();
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})