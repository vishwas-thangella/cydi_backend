const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Code:{
        type:String,
        required:true
    },
    Validity:{
        type:String,
        required:true
    },
    Limit:{
        type:Number,
        required:true
    },
    Credits:{
        type:Number,
        required:true
    },
    Users:[]
}); 

module.exports = mongoose.model("creditscoupon",Schema);