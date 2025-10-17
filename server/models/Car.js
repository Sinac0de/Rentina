const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0
  },
  specs: {
    fuel: {
      type: String,
      required: true
    },
    transmission: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    steering: {
      type: String,
      required: true
    }
  },
  images: [{
    type: String
  }],
  availability: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);