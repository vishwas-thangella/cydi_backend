const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Name:{
        type:String
    },
    Message:{
        type:String,
        required:true
    },
    Rating:{
        type:Number
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    serviceID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"services"
    },
    Show:{
        type:Boolean,
        default:false
    },
    BookingID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"bookings"
    }
});

module.exports = mongoose.model("reviews",Schema);