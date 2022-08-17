const Comment = require('../models/Comment')
class CommentController{
    async store(req,res){
        try{
            if(req.body.userId&&req.body.postId){
                if(req.body.desc||req.body.image){
                    const newComment = new Comment(req.body)
                    const cmt = await newComment.save();
                    res.status(200).json({data:cmt,msg:"Success"})
                }
            }else{
                res.status(200).json({msg:"Error"})
            }
            
        }catch(error){
            res.status(500).json(error)
        }
    }
}

module.exports = new CommentController;