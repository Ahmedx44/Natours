const Tour = require('./../model/tourModel');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(404).json({
      status: 404,
      message: 'The request body is missing name and price',
    });
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // console.log('xx');
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'updated',
    // data: {
    //   tour: '<tour updated ...!>',
    // },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Deleted',
    data: null,
  });
};
