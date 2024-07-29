//jshint esversion:6
//worker schema

const mongoose = require("mongoose");
const { isEmail } = require("validator");

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Invalid Email"],
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  register_date: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    Enum: ["Available", "Not_Available", "Booked"],
  },

  services: [
    {
      serviceId: {
        type: mongoose.Types.ObjectId,
        ref: "Service",
      },
    },
  ],
});

const Worker = mongoose.model("Worker", workerSchema);
module.exports = Worker;
