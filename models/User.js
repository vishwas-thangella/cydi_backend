const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,"Name is required !"]
    },
    Email:{
        type:String,
        required:[true,"Email is required !"]
    },
    Password:{
        type:String,
        required:[true,"Password is required !"]
    },
    Mobile:{
        type:Number,
        required:[true,"Mobile Number is required !"]
    },
    Credits:{
        type:Number,
        default:0
    },
    Bookings:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"bookings"
            }
        }
    ],
    Coupons:{
        type:Array
    },
    Rewards:{
        type:Array
    },
    Profile:{
        type:String
    },
    Membership:{
        Status:{
            type:Boolean,
            default:false
        },
        Name:{
            type:String,
        },
        Validity:{
            type:String
        },
        isValid:{
            type:Boolean,
        },
        TotalCredits:{
            type:Number,
        },
        AvailableCredits:{
            type:Number
        },
        Type:{
            type:String
        }
    },
    State:{
        type:String
    },
    City:{
        type:String
    }
});

module.exports = mongoose.model("users",UserSchema);