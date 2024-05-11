const express = require("express");
const { AddCoupon, getCoupons, DeleteCoupon, updateCoupon, getCoupon, ApplyCoupon } = require("../controllers/Coupons");
const { Authorize } = require("../middlewares/Authorize");

const router = express.Router();

router.get("/:id",getCoupon);
router.post("/add",AddCoupon);
router.get("/",getCoupons);
router.delete("/:id",DeleteCoupon);
router.put("/:id",updateCoupon);
router.get("/apply/:code/:sid",ApplyCoupon);

module.exports = router;