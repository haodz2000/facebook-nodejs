const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    lastName:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    gender:{
        type: String
    },
    phone:{
        type: String,
        default: "",
        max: 11
    },
    email: {
        type:String,
        max: 50,
    },
    password:{
        type: String,
        default: ""
    },
    avatar:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    description:{
        type:String,
        max: 500,
        default:""
    },
    birthday:{
        type: Date,
        default: Date.now() 
    },
    friends:{
        type: Array,
        default: []
    },
    waitFriends:{
        type: Array,
        default: []
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    tick:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})
module.exports = mongoose.model("User",UserSchema);