const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const forgotPasswordModel = require("../models/ForgotPassword");
const nodemailer = require("nodemailer");

const Adduser = async (req, res) => {
    try {
        const user = await userModel.findOne({ Email: req.body.Email });
        if (user) {
            throw new Error('exist');
        } else {
            const usr = new userModel(req.body);
            const hash = await bcrypt.hash(req.body.Password, 10);
            usr.Password = hash;
            await usr
                .save()
                .then(resp => {
                    res.status(200).json({
                        success: true,
                        message: 'user saved !',
                    });
                })
                .catch(err => {
                    throw new Error(err.message);
                });
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message,
        });
    }
};

const Signin = async (req, res) => {
    try {
        const user = await userModel.findOne({ Email: req.body.Email });
        if (user) {
            if (await bcrypt.compare(req.body.Password, user.Password)) {
                const id = user._id;
                await jwt.sign(
                    { id },
                    process.env.SECRET,
                    { expiresIn: '2h' },
                    (err, token) => {
                        if (err) {
                            throw new Error(err.message);
                        } else {
                            res.status(200).json({
                                success: true,
                                message: 'login success',
                                token,
                                user
                            });
                        }
                    },
                );
            } else {
                throw new Error("invalid pass");
            }
        } else {
            throw new Error('not exist');
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message,
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const token = req.params.token;
        const decode = jwt.decode(token, process.env.SECRET);
        const user = await userModel.findOne({ _id: decode.id }).populate("Bookings.id");
        if (user) {
            // console.log(user);
            const date = new Date().toISOString().split("T")[0];
            if (user.Membership.Status) {
                const Validity = new Date(user.Membership.Validity).toISOString().split("T")[0];
                if (date > Validity) {
                    user.Membership.Status = false;
                    user.Membership.isValid = false;
                }
            }
            res.status(200).json({
                success: true,
                user
            });
        } else {
            throw new Error("user not Found !")
        }
    } catch (err) {
        res.status(200).json({
            success: false
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const token = req.params.token;
        const decode = jwt.decode(token, process.env.SECRET);
        const user = await userModel.findOneAndUpdate({ _id: decode.id }, { $set: { ...req.body } }, { new: false });
        if (user) {
            res.status(200).json({
                success: true,
                message: 'User profile updated successfully',
                user
            });
        } else {
            throw new Error("User not found");
        }
    } catch (err) {
        res.status(200).json({
            success: false,
            message: err.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({
            success: true,
            users
        });
    } catch (err) {
        res.status(200).json({
            success: false,
            message: err.message
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const usr = await userModel.findOne({ Email: req.params.email });
        if (usr) {
            const otp = generateOTP();
            const forgotPassword = new forgotPasswordModel({
                Email: req.params.email,
                otp: otp
            });
            await forgotPassword.save().then(rsp => {
                const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "info@chaseyourdreamsindia.com",
                        pass: "jalp icjh divo punt",
                    },
                });

                const mailOptions = {
                    from: "talk2shravankaipa@gmail.com",
                    to: usr.Email,
                    subject: `Forgot Password CHASE YOUR DREAMS INDIA PVT LTD`,
                    text: `Hello , ${usr.Name},
                        the OTP for resetting your password is ${otp}
                    `,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email: ", error);
                    } else {
                        console.log("Email sent: ", info.response);
                    }
                });

                res.status(200).json({
                    success:true,
                    message:"OTP sent"
                });

            }).catch(er => {
                throw new Error(er.message);
            });
        } else {
            throw new Error("user not Found !");
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const forgetPass = await forgotPasswordModel.findOne({ Email: req.params.email });
        if (forgetPass) {
            if (forgetPass.otp === req.params.otp) {
                await forgotPasswordModel.deleteOne({Email:req.params.email});
                res.status(200).json({
                    success:true,
                    message:"Otp verified !"
                });
            } else {
                throw new Error("otp not matched !");
            }
        } else {
            throw new Error("No record Found !");
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const changePassword = async (req,res) =>{
    try{    
        const user = await userModel.findOne({Email:req.body.email});
        if(user){
            const hash = await bcrypt.hash(req.body.password,10);
            user.Password = hash;
            await user.save().then(resp=>{
                res.status(200).json({
                    success:true,
                    message:"Password Changed !"
                });
            }).catch(err=>{
                throw new Error(err.message)
            })
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


const generateOTP = () => {
    const rand = Math.random() * 9000;
    const num = Math.floor(rand);
    const otp = Math.floor(1000 + num);
    return otp;
}

module.exports = { Adduser, Signin, getUserProfile, updateUserProfile, getAllUsers, verifyOtp, forgotPassword, changePassword };
