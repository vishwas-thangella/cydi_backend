const express = require('express');
const router = express.Router();

const {
    AddCreditCoupon,
    RemoveCreditCoupon,
    UpdateCreditCoupon,
    GetAllCreditCoupons,
    RedeemCoupon
} = require('../controllers/CreditCoupon');


router.post('/add', AddCreditCoupon);

router.delete('/remove/:Code', RemoveCreditCoupon);

router.put('/update/:Code', UpdateCreditCoupon);

router.get('/all', GetAllCreditCoupons);

router.get("/redeem/:code/:email",RedeemCoupon);

module.exports = router;
