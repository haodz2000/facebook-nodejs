const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require('../models/Comment')
class PostController{
    async store(req,res){
        try {
            const newPost = new Post(req.body)
            const post = await newPost.save();
            !post && res.status(403).json({data:{},msg:"Failed"})
            res.status(200).json({data:post,msg:"Success"})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getTimeLine(req,res){
        try {
            const currentUser = await User.findById(req.params.userId);
            const posts = await Post.find({
                userId: req.params.userId
            });
            const followingsPosts = await Promise.all(
                currentUser.followings.map((id)=>{
                    return Post.find({userId:id})
                })
            );
            res.status(200).json({data:posts.concat(...followingsPosts),msg:"Success"})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getPostsUser(req,res){
        try{
            const posts = await Post.find({
                userId : req.params.userId
            })
            res.status(200).json({data:posts,msg:"Success"})
        }catch(error){
            res.status(500).json(error)
        }
    }

    async like(req,res){
        try{
            if(req.body.userId !==''){
                const post = await Post.findById(req.body.postId)
                !post && res.status(200).json({msg:"Not found post"})
                if(post.likes.find(user=>user === req.body.userId)){
                    var index = post.likes.indexOf(req.body.userId)
                    post.likes.splice(index,1)
                    await post.save();
                    res.status(200).json({data:post,msg:false})
                }else{
                    post.likes.push(req.body.userId)
                    await post.save();
                    res.status(200).json({data:post,msg:true})
                }
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    async loadComment(req,res){
        try{
            if(req.body.postId){
                const comments = await Comment.find({
                    postId: req.body.postId
                })
                res.status(200).json({data:comments})
            }
        }catch(error){
            res.status(500).json(error)
        }
    }
}

module.exports = new PostController