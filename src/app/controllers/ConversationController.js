const Conversation = require('../models/Conversation')
class ConversationController{
    async store(req,res){
        try {
            const newCon = new Conversation(req.body)
            const cons = await newCon.save()
            res.status(200).json({data:cons,msg:true})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async findExits(req,res){
        try{
            const cons = await Conversation.findOne({
                members: { $all :req.body.members}
            })
            if(cons){
                res.status(200).json({data:cons,msg:true})
            }else{
                res.status(200).json({msg:false})
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    async findAll(req,res){
        try{
            const cons = await Conversation.find({
                members: {$all: [req.body.userId]}
            })
            if(cons){
                res.status(200).json({data:cons,msg:true})
            }else{
                res.status(200).json({data:cons,msg:false})
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    async findOne(req,res){
        try{
            const cons = await Conversation.findById(req.query.id)
            if(cons.members.includes(req.query.userId)){
                res.status(200).json({data:cons,msg:true})
            }else{
                res.status(404).json({msg:false})
            }
        }catch(error){
            res.status(500).json(error)
        }
    }
}

module.exports = new ConversationController