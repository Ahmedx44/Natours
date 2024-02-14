const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/errorController');
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

//
//3)Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
