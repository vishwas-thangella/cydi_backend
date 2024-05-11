const express = require("express");
require("dotenv").config({path:".env"});
const connecttoDb = require("./config/database");
const cors = require("cors");

//Routes
const userRoute = require("./routes/user");
const couponRoute = require("./routes/Coupons");
const serviceRoute = require("./routes/service");
const timeslotRoute = require("./routes/TimeSlot");
const BookingRoute = require("./routes/Booking");
const ReviewRoute = require("./routes/Reviews");
const MembershipRoute = require("./routes/Membership");
const MembershipCouponRoute = require("./routes/MembershipCoupon");
const CouponCreditsRoute = require("./routes/CreditsCoupons")
const invoiceRoute = require("./routes/invoice");

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/v1/cydi/user",userRoute);
app.use("/api/v1/cydi/coupons",couponRoute);
app.use("/api/v1/cydi/services",serviceRoute);
app.use("/api/v1/cydi/timeslot",timeslotRoute);
app.use("/api/v1/cydi/book",BookingRoute);
app.use("/api/v1/cydi/review",ReviewRoute);
app.use("/api/v1/cydi/membership",MembershipRoute);
app.use("/api/v1/cydi/membershipcoupon",MembershipCouponRoute);
app.use("/api/v1/cydi/couponcredits",CouponCreditsRoute)
app.use("/api/v1/cydi/invoice",invoiceRoute)

connecttoDb();

app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`);
});
