const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const CommentSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    postId:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
    },
    image:{
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Comment",CommentSchema);

