const MembershipModel = require("../models/Membership");
const userModel = require("../models/User");
const moment = require("moment");


const AddMembership = async (req,res) =>{
    try{
        const Membership = new MembershipModel(req.body);
        await Membership.save().then(resp=>{
            res.status(200).json({
                success:true,
                message:"membership saved !"
            });
        }).catch(err=>{
            throw new Error(err.message);
        })
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

const PurchaseMembership = async (req,res) =>{
    try{
        const user = await userModel.findOne({Email:req.params.uid});
        const membership = await MembershipModel.findOne({_id:req.params.mid});
        if(membership){
            if(user){
                user.Membership.Status = true;
                user.Membership.Name = membership.Name;
                user.Membership.TotalCredits = membership.Credits;
                user.Credits = user.Credits + membership.Credits;
                user.Membership.AvailableCredits = membership.Credits;
                user.Membership.isValid = true;
                const Validity = moment().add(membership.Validity,"months");
                user.Membership.Validity = Validity;
                user.Membership.Type = membership.Type;
                await user.save();
                res.status(200).json({
                    success:true,
                    message:"Membership Added !"
                });
            }else{
                throw new Error("user not exist !")
            }
        }else{
            throw new Error("membership not Found !")
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
};

const DeActivateMembership = async (req,res) =>{
    try{
        const user = await userModel.findOne({Email:req.params.email});
        if(user && user.Membership.Status){
            user.Credits = 0;
            user.Membership.Status = false;
            user.Membership.AvailableCredits = 0;
            user.Membership.Name = "",
            user.Membership.TotalCredits = 0;
            user.Membership.Validity = "",
            user.Membership.isValid = false;
            user.Membership.Type = "";
            await user.save();
            res.status(200).json({
                success:true,
                message:"Membership Deactivated !"
            });
        }else{
            throw new Error("user not Found ! / No Membership ");
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

const GetMemberships = async (req,res) =>{
    try{
        const memberships = await MembershipModel.find();
        res.status(200).json({
            success:true,
            memberships
        });
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

module.exports = { PurchaseMembership, DeActivateMembership, AddMembership, GetMemberships };