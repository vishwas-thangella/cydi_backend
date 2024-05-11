const serviceModel = require("../models/Service");
const nodemailer = require("nodemailer");
const addService = async (req, res) => {
    try {
        const service = await serviceModel.findOne({ name: req.body.name });
        if (service) {
            throw new Error("service already exists!");
        } else {
            const doc = new serviceModel(req.body);
            const saved = await doc.save();
            if (saved) {
                res.status(200).json({
                    success: true,
                    message: "service saved!"
                });
            } else {
                throw new Error("failed to save service");
            }
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const getAllServices = async (req, res) => {
    try {
        const services = await serviceModel.find();
        res.status(200).json({
            success: true,
            services
        });
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const DeleteService = async (req, res) => {
    try {
        const service = await serviceModel.findById(req.params.id);
        if (service) {
            const deleted = await serviceModel.deleteOne({ _id: req.params.id });
            if (deleted) {
                res.status(200).json({
                    success: true,
                    message: "Deleted!"
                });
            } else {
                throw new Error("Failed to delete!");
            }
        } else {
            throw new Error("Service not found!");
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const findService = async (req, res) => {
    try {
        const service = await serviceModel.findById(req.params.id);
        if (service) {
            res.status(200).json({
                success: true,
                service
            });
        } else {
            throw new Error("Service not found!");
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const updateService = async (req, res) => {
    try {
        const service = await serviceModel.findByIdAndUpdate(req.params.id, req.body, { new: false });
        if (service) {
            res.status(200).json({
                success: true,
                message: "Service updated!",
                service
            });
        } else {
            throw new Error("Service not found!");
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const ContactService = (req, res) => {
    try {

        console.log(req.body);

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
            to: "thangellavishwas@gmail.com",
            subject: `CHASE YOUR DREAMS INDIA PVT LTD`,
            text: `Hi shravan,

            I hope this message finds you well.
            
            We have received a new submission through our contact form. Below are the details provided:
            
            Firstname: ${req.body.Firstname}
            Lastname: ${req.body.Lastname}
            Phone Number: ${req.body.Mobile}
            Email: ${req.body.Email}
            Date: ${new Date(req.body.Date).toISOString().split("T")[0]}
            Message: ${req.body.Message}
            
            Please review this information and take necessary action. If a response is required, kindly get back to the sender at the provided email address or phone number.`,
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
            message:"Thank you for your response."
        });

    } catch (err) {
        res.status(200).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { addService, getAllServices, DeleteService, findService, updateService, ContactService };
