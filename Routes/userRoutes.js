const express = require('express');
const userControllers = require('../Controllers/userControllers');
const authControllers = require('../Controllers/authControllers');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.post('/forgetPassword', authControllers.forgetPassword);
router.patch('/resetPassword/:token', authControllers.resetPassword);
router.patch(
  '/updateMyPassword',
  authControllers.protect,
  authControllers.updatePassword
);
router.patch('/updateMe', authControllers.protect, userControllers.updateMe);
router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
