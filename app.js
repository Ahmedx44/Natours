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

app.all('*', (req, res, next) => {
  const err = new Error(`can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//3)Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
