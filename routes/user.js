const express = require("express");
const { Adduser, getUserProfile, updateUserProfile, forgotPassword, verifyOtp, changePassword } = require("../controllers/User");
const { Signin } = require("../controllers/User");
const { Authorize } = require("../middlewares/Authorize");

const Router = express.Router();

Router.post("/",Adduser);
Router.post("/signin",Signin);
Router.get("/:token",Authorize,getUserProfile);
Router.put("/:token",Authorize,updateUserProfile);
Router.get("/forgotpassword/:email",forgotPassword)
Router.post("/forgotpassword/verify/:email/:otp",verifyOtp);
Router.post("/forgotpassword/change",changePassword);

module.exports = Router;