const TimeSlotModel = require("../models/TimeSlot");


const AddtimeSlot = async (req,res) =>{
    try{
        const timeSlot = await TimeSlotModel.findOne({time:req.body.time});
        if(timeSlot){
            throw new Error("Time slot exist !")
        }else{
            const time = new TimeSlotModel(req.body);
            const saved = await time.save();
            if(saved){
                res.status(200).json({
                    success:true,
                    message:"slot added !"
                });
            }else{
                throw new Error("failed to save the timeslot")
            }
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
};

const getTimeSlots = async (req,res) =>{
    try{
        const timeslots = await TimeSlotModel.find();
        res.status(200).json({
            success:true,
            timeslots
        });
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

const updateTimeSlots = async (req,res)=>{
    try{
        const timeslot = await TimeSlotModel.findOne({time:req.body.time});
        if(timeslot){
            const updated = await TimeSlotModel.updateOne({time:req.body.time},{$set:{...req.body}});
            if(updated){
                res.status(200).json({
                    success:true,
                    message:"time slot updated !"
                });
            }else{
                throw new Error("Failed to update time slot")   
            }       
        }else{
            throw new Error("Time slot not Found !");
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        })
    }
}

const DeleteTimeSlot = async (req,res) =>{
    try{
        const timeslot = await TimeSlotModel.findOne({time:req.body.time});
        if(timeslot){   
            const deleted = await TimeSlotModel.deleteOne({time:req.body.time});
            if(deleted){
                res.status(200).json({success:true,message:"deleted !"});
            }else{
                throw new Error("Failed to delete ")
            }
        }else{
            throw new Error("Timeslot not Exits !");
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        })
    }
}

module.exports =  { AddtimeSlot, getTimeSlots, updateTimeSlots, DeleteTimeSlot }