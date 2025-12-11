const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  // amount stored in cents (integer)
  amount: {
    type: Number,
    required: true,
    min: [1, 'Donation amount must be at least 1 cent'],
    validate: {
      validator: Number.isInteger,
      message: 'Amount must be an integer number of cents',
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  message: {
    type: String,
    trim: true,
    default: '',
  },
  paymentIntentId: {
    type: String,
    required: true,
    unique: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'usd',
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'succeeded', 'failed', 'canceled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// update timestamp before save
donationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});



module.exports = mongoose.model('Donation', donationSchema);