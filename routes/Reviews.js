const express = require('express');
const router = express.Router();
const {
    AddReview,
    GetReview,
    UpdateReview,
    DeleteReview,
    GetReviews
} = require('../controllers/Reviews');

// Routes
router.post('/add-review', AddReview);
router.get('/review/:id', GetReview);
router.put('/update-review/:id', UpdateReview);
router.delete('/delete-review/:id', DeleteReview);
router.get('/reviews', GetReviews);

module.exports = router;
