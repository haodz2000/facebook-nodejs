const User = require("../models/User")
class UserController{
    async index(req,res){
        try{
            const user = await User.findById(req.params.userId)
            !user && res.status(403).json("Not found User")
            const {password,updateAt,...others} = user._doc
            res.status(200).json({data:others,msg:"Success"})
        }catch(error){
            res.status(500).json(error)
        }
    }

    async getUsers(req,res){
        try {
            const users = await User.find();
            const list =  users.map((user)=>{
                const {password, updatedAt,...others} = user._doc
                return others
            })
            res.status(200).json({data:list,msg:"Success"})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    async follow(req,res){
        try{
            const senderId = req.body.senderId
            const receiverId = req.body.receiverId
            if(senderId !=="" && receiverId !==""){
                const sender = await User.findById(senderId)
                const receiver = await User.findById(receiverId)
                if(sender && receiver){
                    if(sender.followings.includes(receiverId)&&receiver.followers.includes(senderId)){
                        var index = sender.followings.indexOf(receiverId)
                        sender.followings.splice(index,1)
                        var index2 = receiver.followers.indexOf(senderId)
                        receiver.followers.splice(index2,1)
                        await sender.save();
                        await receiver.save();
                        res.status(200).json({data:req.body,follow:false})
                    }else{
                        sender.followings.push(receiverId)
                        receiver.followers.push(senderId)
                        await sender.save();
                        await receiver.save();
                        res.status(200).json({data:req.body,follow:true})
                    }
                }
            }
            else{
                res.status(403).json({msg:"Fail"})
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    async getOnlineUsers(req,res){
        try {
            const online = req.body.online
            const users = await Promise.all(
                online.map((item)=>{
                    return User.findById(item.userId)
                })
            )
            const list =  users.map((user)=>{
                const {password,updatedAt,...others} = user._doc
                return others
            })
            res.status(200).json({data:list,msg:true})
        } catch (error) {   
            res.status(500).json(error)
        }
    }
}

module.exports = new UserController;
