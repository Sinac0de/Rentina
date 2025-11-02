const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    year: {
      type: Number,
      required: false,
      index: true,
    },
    specs: {
      rental_price: {
        type: Number,
        required: true,
        min: 0,
      },
      discount_percent: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        required: true,
        enum: [
          "SUV",
          "Sedan",
          "Hatchback",
          "Convertible",
          "Coupe",
          "Luxury",
          "Electric",
          "Muscle Car",
          "Sports Car",
        ],
        index: true,
      },
      desc: {
        type: String,
      },
      transmission: {
        type: String,
        required: true,
        enum: ["Manual", "Automatic"],
        index: true,
      },
      seats: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
      fuel_capacity: {
        type: Number,
      },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
      index: true,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    availability: {
      type: Boolean,
      default: true,
      index: true,
    },
    // Additional fields from existing data structure
    thumbnail_img: String,
    img_urls: [
      {
        id: Number,
        src: String,
      },
    ],
    reviews: [
      {
        id: Number,
        name: String,
        Occupation: String,
        review: String,
        profile_img: String,
        date: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add indexes for better query performance
carSchema.index({ make: 1, model: 1 });
carSchema.index({ "specs.rental_price": 1, availability: 1 });
carSchema.index({ "specs.type": 1, rating: -1 });

module.exports = mongoose.model("Car", carSchema);