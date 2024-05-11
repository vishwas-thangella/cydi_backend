const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    code:{
        type:String,
        required:[true,"code is required !"]
    },
    validity:{
        type:String,
        required:[true,"validity is required !"]
    },
    limit:{
        type:Number,
        required:[true,"Limit is required !"]
    },
    amount:{
        type:String,
        required:[true,"Amount is required !"]
    },
    active:{
        type:Boolean,
        default:true
    },
    claimed:{
        type:Number,
        default:0
    },
    validFor:{
        type:String,
        required:[true,"valid For is required !"]
    },
});

module.exports = mongoose.model("coupons",CouponSchema);