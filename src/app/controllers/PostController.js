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
            const currentUser = await User.findById(req.params.userId)
            console.log(currentUser);
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
}

module.exports = new PostController