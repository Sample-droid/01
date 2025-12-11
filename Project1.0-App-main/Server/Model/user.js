// models/User.js

const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Create and export the model
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;