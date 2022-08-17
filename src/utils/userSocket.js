const addUser = (onlineUsers,userId,socketId)=>{
    !onlineUsers.some((user)=>user.userId === userId)&&
        onlineUsers.push({userId,socketId})
}
const removeUser = (onlineUsers,socketId)=>{
    onlineUsers = onlineUsers.filter((user)=>user.socketId !== socketId)
    return onlineUsers;
}

const getUser = (onlineUsers,userId)=>{
    return onlineUsers.find((user)=>user.userId === userId)
}
module.exports = {addUser, removeUser, getUser}