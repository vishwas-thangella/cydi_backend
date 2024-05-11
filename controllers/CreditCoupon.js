const CreditCouponModel = require("../models/CreditsCoupon");
const User = require("../models/User");

const AddCreditCoupon = async (req, res) => {
    try {
        const existingCoupon = await CreditCouponModel.findOne({ Code: req.body.Code });

        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: "Coupon already exists!"
            });
        }

        const coupon = new CreditCouponModel(req.body);
        await coupon.save();

        res.status(201).json({
            success: true,
            message: "Coupon added successfully!"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};


const RemoveCreditCoupon = async (req, res) => {
    try {
        const { Code } = req.params;
        const deletedCoupon = await CreditCouponModel.findOneAndDelete({ Code });

        if (!deletedCoupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Coupon removed successfully!"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};


const UpdateCreditCoupon = async (req, res) => {
    try {
        const { Code } = req.params;
        const updatedCoupon = await CreditCouponModel.findOneAndUpdate(
            { Code },
            req.body,
            { new: true }
        );

        if (!updatedCoupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Coupon updated successfully!",
            data: updatedCoupon
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};


const GetAllCreditCoupons = async (req, res) => {
    try {
        const coupons = await CreditCouponModel.find();
        res.status(200).json({
            success: true,
            data: coupons
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

const RedeemCoupon = async (req,res) =>{
    try{
        const user = await User.findOne({Email:req.params.email});
        if(user){
            const coupon = await CreditCouponModel.findOne({Code:req.params.code});
            if(coupon){
                if(coupon.Limit > 0){
                    const index = coupon.Users.findIndex(ind=>ind.toString()===user._id.toString());
                    if(index>=0){
                        throw new Error("Coupon already Redeemed !")
                    }else{
                        user.Credits = user.Credits + coupon.Credits;
                        coupon.Limit = coupon.Limit - 1;
                        coupon.Users.push(user._id);
                        await user.save().then(async resp=>{
                            await coupon.save().then(resp=>{
                                res.status(200).json({
                                    success:true,
                                    message:"coupon redeemed successfully"
                                });
                            }).catch(err=>{
                                throw new Error(err.message);
                            });
                        }).catch(err=>{
                            throw new Error(err.message)
                        })
                    }
                }else{
                    throw new Error("Coupon limit Exceeded !"); 
                }
            }else{
                throw new Error("Coupon not Found !");  
            }
        }else{
            throw new Error("user not Found !");
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

module.exports = {
    AddCreditCoupon,
    RemoveCreditCoupon,
    UpdateCreditCoupon,
    GetAllCreditCoupons,
    RedeemCoupon
};
