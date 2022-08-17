const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true
    },
    senderId:{
        type: String,
        required: true
    },
    receiverId:{
        type: String,
        required: true   
    },
    message:{
        type: String,
        default:""
    },
    image:{
        type: String,
        default:""
    }
},{timestamps: true});

module.exports = mongoose.model("Message",MessageSchema);
