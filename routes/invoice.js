const express = require('express');
const { createInvoicePdf } = require('../controllers/pdfs');

const router = express.Router();

router.post("/create",createInvoicePdf);

module.exports = router;