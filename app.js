const express = require('express');
const morgan = require('morgan');

const userRouter = require('./Routes/userRoutes');
const tourRouter = require('./Routes/tourRoutes');

const app = express();

//1)Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//3)Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
