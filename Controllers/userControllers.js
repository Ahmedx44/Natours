const catchAsync = require('../utils/catchAsync');
const User = require('./../model/userModel');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    number: users.length,
    requestAt: req.requestTime,
    data: {
      users,
    },
  });

  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};
