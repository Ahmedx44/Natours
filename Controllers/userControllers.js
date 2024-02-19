const catchAsync = require('../utils/catchAsync');
const User = require('./../model/userModel');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFiled) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFiled.includes(el)) newObj[el];
  });
  return newObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)Create error if user post password data
  if (req.body.password || req.body.confirmPassword) {
    next(
      new AppError(
        'This is not the route to change password instead go to /updatePassword route',
        400
      )
    );
  }
  //2)Update user data
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'sucess',
    data: updateUser,
  });
});

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};
