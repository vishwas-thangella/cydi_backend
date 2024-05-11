const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    invoiceDate:{
        type:String,
        default:Date.now(),
    },
    BookingID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"bookings"
    },
    Buyer:{
        address:{
            type:String,
        },
        address2:{
            type:String,
        },
        location:{
            type:String,
        },
        pin:{
            type:String
        },
    },
    amount:{
        type:String
    }
});

module.exports = mongoose.model("invoices",Schema);