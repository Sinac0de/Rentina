const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  model: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  year: {
    type: Number,
    required: true,
    index: true
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0,
    index: true
  },
  category: {
    type: String,
    required: true,
    enum: ['SUV', 'Sedan', 'Hatchback', 'Convertible', 'Coupe', 'Luxury', 'Electric', 'Muscle Car', 'Sports Car'],
    index: true
  },
  specs: {
    fuel: {
      type: String,
      required: true,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      index: true
    },
    transmission: {
      type: String,
      required: true,
      enum: ['Manual', 'Automatic'],
      index: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    steering: {
      type: String,
      required: true,
      enum: ['Left', 'Right']
    }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
    index: true
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  availability: {
    type: Boolean,
    default: true,
    index: true
  },
  // Additional fields from existing data structure
  thumbnail_img: String,
  img_urls: [{
    id: Number,
    src: String
  }],
  reviews: [{
    id: Number,
    name: String,
    Occupation: String,
    review: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
carSchema.index({ make: 1, model: 1 });
carSchema.index({ pricePerDay: 1, availability: 1 });
carSchema.index({ category: 1, rating: -1 });

module.exports = mongoose.model('Car', carSchema);