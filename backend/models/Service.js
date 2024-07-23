//jshint esversion:6
//Services schema

const mongoose = require("mongoose");
const ServiceSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  type: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
    min: 0,
  },

  availability: {
    type: Boolean,
    default: true,
  },

  date_added: {
    type: Date,
    default: Date.now,
  },
  
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
