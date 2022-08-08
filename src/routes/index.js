const authRouter = require('./auth')
const postRouter = require("./post")
const userRouter = require("./user")
const route = (app)=>{
    app.use("/api/auth",authRouter)
    app.use("/api/post",postRouter)
    app.use("/api/user",userRouter)
    app.use("/",(req,res)=>{
        res.send("API")
    })
}

module.exports = route