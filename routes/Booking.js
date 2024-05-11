const express = require("express");
const { AddBooking, ViewBooking, ConfirmBooking, CheckAvailability, ViewBookings, purchaseWithCredit } = require("../controllers/Booking");

const router = express.Router();

router.post("/",AddBooking);
router.get("/:id",ViewBooking);
router.put("/confirm",ConfirmBooking);
router.post("/check",CheckAvailability);
router.get("/bookings/:uid",ViewBookings);
router.get("/withcredit/:uid/:sid",purchaseWithCredit);

module.exports = router;