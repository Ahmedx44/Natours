const express = require('express');
const morgan = require('morgan');

const userRouter = require('./Routes/userRoutes');
const tourRouter = require('./Routes/tourRoutes');

const app = express();

//1)Middlewares

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});
///////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4) START SERVER

module.exports = app;
