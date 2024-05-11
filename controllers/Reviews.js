const ReviewModel = require("../models/Review");

const AddReview = async (req, res) => {
    try {
        const Review = new ReviewModel(req.body);
        const saved = await Review.save();
        if(saved){
            res.status(200).json({
                success:true,
                message :"Thank you for your Response."
            });
        }else{
            throw new Error("Failed to save !");
        }
    } catch (e) {
        console.log(e)
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const GetReview = async (req, res) => {
    try {
        const review = await ReviewModel.findById(req.params.id);
        if (review) {
            res.status(200).json({
                success: true,
                review
            });
        } else {
            throw new Error("Review not Found !");
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const UpdateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const updateData = req.body;
        
        const review = await ReviewModel.findByIdAndUpdate(reviewId, updateData, { new: true });
        
        if (review) {
            res.status(200).json({
                success: true,
                message: "Review Updated!",
                review
            });
        } else {
            throw new Error("Review not found!");
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const DeleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        
        const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
        
        if (deletedReview) {
            res.status(200).json({
                success: true,
                message: "Review Deleted!",
                deletedReview
            });
        } else {
            throw new Error("Review not found!");
        }
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

const GetReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find();
        res.status(200).json({
            success: true,
            reviews
        });
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        });
    }
}

module.exports = { AddReview, GetReview, UpdateReview, DeleteReview, GetReviews };
