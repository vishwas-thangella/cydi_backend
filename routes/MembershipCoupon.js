const express = require('express');
const router = express.Router();

const {
    AddMembershipCoupon,
    DeleteMembershipCoupon,
    UpdateMembershipCoupon,
    RedeemCoupon
} = require('../controllers/MembershipCoupon'); 

router.post('/add', AddMembershipCoupon);

router.delete('/delete/:id', DeleteMembershipCoupon);

router.put('/update/:id', UpdateMembershipCoupon);

router.get("/redeem/:code/:mid/:email",RedeemCoupon);

module.exports = router;
