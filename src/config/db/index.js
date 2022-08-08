const mongoose = require('mongoose');
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB,{
            useNewUrlParser: true
        },()=>{
            console.log("Connect database successfully");
        });
    } catch (error) {
        console.log("connect database failed")
    }   
};

module.exports = {connect};
