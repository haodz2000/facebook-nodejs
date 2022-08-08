const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    images:{
        type : Array,
        default: [],
    },
    desc:{
        type: String,
        default: "",
    },
    background: {
        type: Boolean,
        default:true
    },
    likes:{
        type: Array,
        default: []
    },
    comments:{
        type : Array,
        default: []
    },
    shares:{
        type: Array,
        default: []
    },
    views:{
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Post",PostSchema);
