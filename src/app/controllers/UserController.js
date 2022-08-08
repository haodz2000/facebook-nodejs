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
}

module.exports = new UserController;
