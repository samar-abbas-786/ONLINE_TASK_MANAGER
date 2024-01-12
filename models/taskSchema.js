// models/taskSchema.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const User = mongoose.model("User", taskSchema);
module.exports = User;
