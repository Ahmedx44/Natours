const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'));

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

const tourTest = new Tour({
  name: 'The Park',
  price: 499,
});

tourTest
  .save()
  .then((doc) => console.log(`Succefully created: ${doc}`))
  .catch((err) => console.log(`ERROR 💥${err}`));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
