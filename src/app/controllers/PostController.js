const Post = require("../models/Post")
const User = require("../models/User")
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

    async gets(req,res){
        try {
            const currentUser = await User.findById(req.params.userId);
            const posts = await Post.find({
                userId: req.params.userId
            });
            const friendPosts = await Promise.all(
                currentUser.friends.map((friendId)=>{
                    return Post.find({userId:friendId})
                })
            );
            const followingsPosts = await Promise.all(
                currentUser.followings.map((userId)=>{
                    return Post.find({userId:userId})
                })
            );
            res.status(200).json({data:posts.concat(...friendPosts,...followingsPosts),msg:"Success"})
        } catch (error) {
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

    async comment(req,res){
        try{
            res.status(200).json(req.body)
        }catch(error){
            res.status(500).json(error)
        }
    }
}

module.exports = new PostController