const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("forgotpassword",Schema);