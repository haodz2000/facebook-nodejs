const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const ConversationSchema = new Schema({
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
        default: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Conversation",ConversationSchema);
