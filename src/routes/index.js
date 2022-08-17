const authRouter = require('./auth')
const postRouter = require("./post")
const userRouter = require("./user")
const conversationRoute = require("./conversation")
const messageRoute = require("./message")
const route = (app)=>{

    app.use("/api/message",messageRoute)
    app.use("/api/conversation",conversationRoute)
    app.use("/api/auth",authRouter)
    app.use("/api/post",postRouter)
    app.use("/api/user",userRouter)
    app.use("/",(req,res)=>{
        res.send("API")
    })
}

module.exports = route