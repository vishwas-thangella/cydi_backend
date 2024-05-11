const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    limit:{
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    redeemed:{
        type:Number,
        default:0
    },
    validity:{
        type:String
    },
    Amount:{
        type:Number
    }
});;


module.exports = mongoose.model("membershipcoupons",Schema);