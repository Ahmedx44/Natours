const express = require('express'); //npm i express
const morgan = require('morgan'); //npm i morgan
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/errorController');
const userRouter = require('./Routes/userRoutes');
const tourRouter = require('./Routes/tourRoutes');
const rateLimit = require('express-rate-limit'); //npm i express-rate-limit
const helmet = require('helmet'); //npm i helmet
const mongoSanitize = require('express-mongo-sanitize'); //npm i express-mongo-sanitize
const xss = require('xss-clean'); //npm i xss-clean
const hpp = require('hpp'); //npm i hpp

const app = express();

//1)GLOBAL Middlewares
//Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Set Limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
}); // this is to make the user request limited if the user request more than it speficied it will show the meessage

app.use('/api', limiter); //this is telling it to which route the limiter will work

//Body parse,reading data from body in to req.body
app.use(express.json({ limit: '10kb' }));

//Data Sanitization against noSQL query injection
app.use(mongoSanitize()); //Will remove  any sign related to mongodb ;ike $

//Data Sanitization against XSS
app.use(xss()); //this will clean any user input malicous html code

app.use(
  hpp({
    whitelist: [
      'dusration',
      'price',
      'ratingQuantity',
      'ratingAverage',
      'maxGroupSize',
      'diffculty',
    ],
  })
); //this will prevent any form of hpp attack

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
