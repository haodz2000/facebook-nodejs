const Message = require("../models/Message")
const Conversation = require("../models/Conversation")
class MessageController{
    async store(req,res){
        try{
            const newMes = new Message(req.body)
            const message = await newMes.save();
            if(message){
                const cons = await Conversation.findById(req.body.conversationId)
                cons.senderId = req.body.senderId,
                cons.newMessage = req.body.message,
                cons.status = true
                await cons.save();
                res.status(200).json({data:message,msg:true})
            }
            else{
                res.status(304).json({msg:false})
            }
            
        }catch(error){
            res.status(500).json(error)
        }
    }
    async loadMessage(req,res){
        try{
            const messages = await Message.find(
                {
                    conversationId: req.body.conversationId,
                }
            ).limit(100)
            if(messages){
                res.status(200).json({data:messages,msg:true})
            }else{
                res.status(304).json({msg:false})
            }
        }catch(error){
            res.status(500).json(error)
        }
    }
}

module.exports = new MessageController