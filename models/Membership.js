const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Credits:{
        type:Number,
        required:true
    },
    Users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ],
    Validity:{
        type:String,
    },
    KeyPoints:[],
    Type:{
        type:String
    },
    Price:{
        type:Number
    },
    Bg:{
        type:String,
        required:true
    },
    CardImg:{
        type:String,
        required:true
    },
    Icon:{
        type:String
    },
    Description:{
        type:String
    }
});

module.exports = mongoose.model("membership",Schema);