const couponModel = require("../models/Coupons");
const serviceModel = require("../models/Service");

const AddCoupon = async (req,res) =>{

    try{
        const coupon = await couponModel.findOne({code:req.body.code});
        if(!coupon){
            const cpn = new couponModel(req.body);
            const saved = await cpn.save();
            if(saved){
                res.status(200).json({
                    success:true,
                    message:"coupon added !"
                });
            }else{
                throw new Error("Failed to save !")
            }
        }else{
            throw new Error("Coupon exits !");
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}


const getCoupons = async (req,res) =>{
    try{
        const coupons = await couponModel.find();
        res.status(200).json({
            success:true,
            coupons
        });
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

const DeleteCoupon = async (req,res)=>{
    try{
        const coupon = await couponModel.findById(req.params.id);
        if(coupon){
            const deleted = await coupon.deleteOne({_id:req.params.id});
            if(deleted){
                res.status(200).json({
                    success:true,
                    message:"Coupon deleted !"
                });
            }else{
                throw new Error("Failed to delete Coupon")
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

const getCoupon = async (req,res) =>{
    try{    
        const coupon = await couponModel.findById(req.params.id);
        if(coupon){
            res.status(200).json({
                success:true,
                coupon
            });
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

const updateCoupon = async (req,res) =>{
    try{
        const coupon = await couponModel.findById(req.params.id);
        if(coupon){
            const updated = await couponModel.updateOne({_id:req.params.id},{$set:{...req.body}});
            if(updated){
                res.status(200).json({
                    success:true,
                    message:"Coupon updated !"
                });
            }else{
                throw new Error("failed to update !")
            }
        }else{
            throw new Error("Coupon not Found !")
        }
    }catch(e){  
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

const ApplyCoupon = async (req,res) =>{
    try{
        // console.log("called");
        const coupon = await couponModel.findOne({code:req.params.code});
        if(coupon && coupon.active){
            const service = await serviceModel.findById(req.params.sid);
            if(service){
                if(coupon.validFor === service.category){
                    if(coupon.limit > 0){
                        coupon.limit = coupon.limit - 1;
                        coupon.claimed = coupon.claimed + 1;
                        await coupon.save();
                        res.status(200).json({
                            success:true,
                            coupon
                        });
                    }else{
                        throw new Error("Coupon is limit is over !");
                    }
                }else{
                    throw new Error("Coupon is not valid for the service !");
                }
            }else{
                throw new Error("service not Found !")
            }
        }else{
            throw new Error("Coupon not Found ! or Coupon is not active !")
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        })
    }
}


module.exports = { AddCoupon, getCoupons, DeleteCoupon, getCoupon, updateCoupon , ApplyCoupon };