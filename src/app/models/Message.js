const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const MessageSchema = new Schema({
    conversationId: {
        type: String,
        required: true
    },
    senderId:{
        type: String,
        required: true
    },
    receivedId:{
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
