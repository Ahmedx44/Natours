const mongoose = require('mongoose');
const validator = require('validator');
const { default: slugify } = require('slugify');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      maxlength: [40, 'tours name must have 40 or less character'],
      minlength: [10, 'tours name must have 10 or greater character'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'duration is required'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'maxGroupsize is required'],
    },
    difficulty: {
      type: String,
      required: [true, 'difficulty is required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be difficult,medium or easy',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'the discount ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required'],
    },
    imageCover: {
      type: String,
      required: [true, 'ImageCover is required'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

//Docuement
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// tourSchema.post('save',function(doc,next)){
//   console.log(doc);
//   next();
// };

//Query Middleware
tourSchema.pre('/^find/', function (next) {
  this.find({ secretTour: { $ne: true } });

  this.save = Date.now();
  next();
});

tourSchema.post('/^find/', function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} millisecond`);

  this.save = Date.now();
  next();
});

tourScheme.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
