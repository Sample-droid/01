const mongoose = require('mongoose');
const User = require('./user'); // optional import, fine to keep

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      maxlength: [100, 'Event name cannot exceed 100 characters']
    },

    code: {
      type: String,
      required: [true, 'Event code is required'],
      unique: true,
      trim: true,
      minlength: [8, 'Event code must be exactly 8 characters'],
      maxlength: [8, 'Event code must be exactly 8 characters']
    },

    date: {
      type: Date,
      required: [true, 'Event date is required'],
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: 'Event date must be in the future'
      }
    },

    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters']
    },

    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },

    category: {
      type: String,
      required: [true, 'Event category is required'],
      enum: {
        values: ['Food Donation', 'Tree Planting', 'Cleaning'],
        message: 'Invalid category. Must be one of: Food Donation, Tree Planting, Cleaning'
      }
    },

    image: {
      type: String, // ✅ New field for storing image path or URL
      default: '',  // optional default empty string
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ✅ links each event to the user who created it
      required: true
    }
  },
  {
    timestamps: true // ✅ automatically adds createdAt & updatedAt
  }
);

// Optional: create index for faster queries
eventSchema.index({ code: 1 });
module.exports = mongoose.model('Event', eventSchema);