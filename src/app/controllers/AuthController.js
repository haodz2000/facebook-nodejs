const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class AuthController{
    async register(req,res){
        try {
            const pwd = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashPwd = await bcrypt.hash(pwd,salt)
            var newUser = new User(req.body);
            newUser.password = hashPwd
            const user = await newUser.save();
            !user&& res.status(404).json({msg:"Save failed"})
            const accessToken = jwt.sign({
                id : user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            {
                expiresIn :"3d"
            })
            const {password,updatedAt,...others} = user._doc
            res.status(200).json({data:{...others,accessToken},msg:"Register Success"})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async login(req,res){
        try {
            const account = req.body.account
            const user = await User.findOne({$or: [
                {email: account},
                {phone: account}
            ]})
            !user&& res.status(404).json({msg:"Not found user"})
            const match = await bcrypt.compare(req.body.password, user.password);
            if(match){
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin : user.isAdmin
                },
                process.env.JWT_SEC,
                {
                    expiresIn : "3d"
                });
                const {password, updatedAt,...others} = user._doc;
                res.status(200).json({data:{...others,accessToken},msg:"Login Success"});
            }else{
                res.status(404).json({msg:"Wrong account or password"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new AuthController;