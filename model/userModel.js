const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//name, email,photo,password,passwordConfirm
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [20, 'Name must have 20 or less characters'],
    minlength: [2, 'Name must have 2 or greater characters'], // Corrected from 20 to 2
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must have 6 or more characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password Confirm is required'],
    validate: {
      //This only work in CREATE and Save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 20);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;
