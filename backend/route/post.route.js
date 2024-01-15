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

postRouter.post("/update/:id",async(req,res)=>{
    let {id}=req.params;
    try {
        let post =await PostModel.find({_id:req.body.userID});
        if(!post){return req.status(200).send({msg:"Invalid Post.."})}

        await PostModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).send({msg:"Post updated..."})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

postRouter.post("/delete/:id",async(req,res)=>{
    let {id}=req.params;
    try {
        let post = await PostModel.findOne({_id:id});
        if(!post){return req.status(200).send({msg:"Invalid Post.."})}

        await PostModel.findByIdAndDelete({_id:id});
        res.status(200).send({msg:"Post Deleted..."})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

module.exports={
    postRouter
}