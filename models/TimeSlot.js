const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    time:{
        type:String,
        required:[true,"Time is required !"]
    },
    Active:{
        type:Boolean,
        default:true
    },
    premium:{
        type:Boolean,
        default:false
    },
    Booked:{
        type:Boolean,
        default:false
    }
});

const TimeSlotModel = mongoose.model("timeslots",Schema);

module.exports = TimeSlotModel;