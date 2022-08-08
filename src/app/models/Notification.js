const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const NotificationSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    senderId:{
        type: String,
        required: true
    },
    recieved:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Notification",NotificationSchema);
