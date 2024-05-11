const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"services",
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    date:{
        type:String
    },
    InvoiceNo:{
        type:String,
    },
    meetLink:{
        type:String
    },
    InvoiceNo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"invoices"
    },
    paymentStatus:{
        type:Boolean,
        default:false
    },
    reviewID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }
});

module.exports = mongoose.model("bookings",Schema);