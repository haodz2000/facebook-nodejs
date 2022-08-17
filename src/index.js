const express = require('express');
const {Server} = require("socket.io")
const morgan = require('morgan');
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express();
const route = require('./routes');
const cors = require('cors')
const database = require('./config/db');
const {addUser, removeUser, getUser} = require("./utils/userSocket")

dotenv.config()
//Connect database
database.connect();

app.use(cors());
app.use(express.json());

//HTTP Logger
app.use(helmet())
app.use(morgan('common'))

//route
route(app)
const io = new Server(8900,{
    cors:{
        origin: "http://localhost:3000"
    }
})

let onlineUsers = []
//Socket
io.on("connection",(socket)=>{
    console.log("Socket is running");
    socket.on("addUser",(userId)=>{
        addUser(onlineUsers,userId,socket.id)
        io.emit("getOnlineUser",onlineUsers)
    })
    socket.on("sendMessage",(data)=>{
        const user = getUser(onlineUsers,data.receiverId)
        console.log(user);
        user&&io.to(user.socketId).emit("getMessage",data)
    })
    socket.on("disconnect",()=>{
        console.log("a user disconnected!");
        onlineUsers = removeUser(onlineUsers,socket.id)
        io.emit("getOnlineUser",onlineUsers)
    })
})


app.listen(process.env.PORT||5000,()=>{
    console.log("Server is running")
})