const express = require('express');
const tourControllers = require('../Controllers/tourControllers');

const router = express.Router();

router.param('id', tourControllers.checkId);

//Create a checkbody middleware
//Check if body contains name and price property
//If not, send back 404(bad request)
//Add it to post handler stack

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.checkBody, tourControllers.createTour);
router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
