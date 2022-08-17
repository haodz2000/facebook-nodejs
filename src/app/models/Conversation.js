const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members:{
        type: Array,
        default: []
    },
    senderId: {
        type: String,
    },
    newMessage: {
        type: String,
        default: "",
    },
    image:{
        type: Array,
        default: []
    },
    status :{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Conversation",ConversationSchema);
