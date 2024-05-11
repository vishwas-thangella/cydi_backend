const express = require("express");
const { AddtimeSlot, getTimeSlots, updateTimeSlots, DeleteTimeSlot } = require("../controllers/TimeSlot");

const router = express.Router();

router.post("/addtimeslot",AddtimeSlot);
router.get("/all",getTimeSlots);
router.put("/update",updateTimeSlots)
router.delete("/delete",DeleteTimeSlot);

module.exports = router;