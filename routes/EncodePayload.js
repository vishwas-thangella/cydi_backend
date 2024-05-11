const EncodePayload = require("../utils/EncodePayload");

const router = require("express").Router();


router.post("/enc",EncodePayload);

module.exports = router;