const express = require('express');
const reviewController = require('./../Controllers/reviewController');
const router = express.Router();
const authControllers = require('./../Controllers/authControllers');

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    reviewController.createNewReview
  );

module.exports = router;
