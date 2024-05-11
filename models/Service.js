const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"service name is required !"]
    },
    price:{
        type:String,
        required:[true,"Price is required !"]
    },
    duration:{
        type:String,
        required:[true,"duration is required !"]
    },
    keyPoints:{
        type:Array
    },
    category:{
        type:String
    },
    background:{
        type:String
    },
    note:{
        type:String,
        default:"In case customized programs are required, we can work with you to provide tailored quotes. We can also help with community development programmes as per requirement. We are open to corporate tie ups as per specific requirements."
    },
    canBook:{
        type:Boolean,
        default:true,
    }
});

const serviceModel = mongoose.model("services",Schema);

module.exports = serviceModel;