const Membership = require("../models/Membership");
const MembershipCouponModel = require("../models/MembershipCoupon");
const User = require("../models/User");

const AddMembershipCoupon = async (req, res) => {
    try {
        const existingCoupon = await MembershipCouponModel.findOne({ code: req.body.code });
        if (existingCoupon) {
            throw new Error("Membership Coupon already exists!");
        } else {
            const newCoupon = new MembershipCouponModel(req.body);
            await newCoupon.save();
            res.status(200).json({
                success: true,
                message: "Coupon added successfully!"
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const DeleteMembershipCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const deletedCoupon = await MembershipCouponModel.findByIdAndDelete(couponId);
        
        if (!deletedCoupon) {
            return res.status(404).json({
                success: false,
                message: "Membership Coupon not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Coupon deleted successfully!"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const UpdateMembershipCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const updatedData = req.body;

        const updatedCoupon = await MembershipCouponModel.findByIdAndUpdate(
            couponId,
            updatedData,
        );

        if (!updatedCoupon) {
            return res.status(404).json({
                success: false,
                message: "Membership Coupon not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Coupon updated successfully!",
            data: updatedCoupon
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const RedeemCoupon = async (req,res) =>{
    try{
        const coupon = await MembershipCouponModel.findOne({code:req.params.code});
        if(coupon){
            const membership = await Membership.findOne({_id:req.params.mid});
            if(membership){
                if(coupon.active && coupon.limit > 0){
                    const user = await User.findOne({Email:req.params.email});
                    if(user){
                        if(coupon.type === membership.Type){
                            coupon.redeemed = coupon.redeemed + 1;
                            coupon.limit = coupon.limit - 1;
                            user.Credits = user.Credits + membership.Credits;
                            await user.save().then(async resp=>{
                                await coupon.save().then(response=>{
                                    res.status(200).json({
                                        success:true,
                                        coupon
                                    });
                                }).catch(err=>{
                                    throw new Error(err.message)
                                })
                            }).catch(err=>{
                                throw new Error(err.message);
                            })
                        }else{
                            throw new Error("Coupon is not valid for this membership");
                        }
                    }else{
                        throw new Error("user not Found !");
                    }
                }else{
                    throw new Error("Coupon is not Active / limit exceeded !")
                }
            }else{
                throw new Error("Membership not Found !");
            }
        }else{
            throw new Error("Coupon not Found !");
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}


module.exports = { AddMembershipCoupon, DeleteMembershipCoupon, UpdateMembershipCoupon, RedeemCoupon };
