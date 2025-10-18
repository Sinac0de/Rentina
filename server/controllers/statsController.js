const Car = require('../models/Car');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Booking = require('../models/Booking');
const asyncHandler = require('express-async-handler');

// @desc    Get dashboard statistics
// @route   GET /api/stats/dashboard
// @access  Public
const getDashboardStats = asyncHandler(async (req, res) => {
  // Get counts for various entities
  const carsCount = await Car.countDocuments();
  const usersCount = await User.countDocuments();
  const blogsCount = await Blog.countDocuments({ published: true });
  const bookingsCount = await Booking.countDocuments();
  
  // Get available cars count
  const availableCarsCount = await Car.countDocuments({ availability: true });
  
  // Get featured blogs
  const featuredBlogs = await Blog.find({ featured: true, published: true })
    .limit(3)
    .sort({ createdAt: -1 });
  
  // Get popular cars (by rating)
  const popularCars = await Car.find({ availability: true })
    .sort({ rating: -1, reviewCount: -1 })
    .limit(5);
  
  // Get car categories with counts
  const categories = await Car.aggregate([
    { $match: { availability: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  res.json({
    stats: {
      cars: carsCount,
      users: usersCount,
      blogs: blogsCount,
      bookings: bookingsCount,
      availableCars: availableCarsCount
    },
    featuredBlogs,
    popularCars,
    categories
  });
});

// @desc    Get car statistics
// @route   GET /api/stats/cars
// @access  Public
const getCarStats = asyncHandler(async (req, res) => {
  // Get cars by category
  const byCategory = await Car.aggregate([
    { $match: { availability: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Get cars by make
  const byMake = await Car.aggregate([
    { $match: { availability: true } },
    { $group: { _id: '$make', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]).limit(10);
  
  // Get cars by year
  const byYear = await Car.aggregate([
    { $match: { availability: true } },
    { $group: { _id: '$year', count: { $sum: 1 } } },
    { $sort: { _id: -1 } }
  ]);
  
  // Get cars by fuel type
  const byFuel = await Car.aggregate([
    { $match: { availability: true } },
    { $group: { _id: '$specs.fuel', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Get cars by transmission
  const byTransmission = await Car.aggregate([
    { $match: { availability: true } },
    { $group: { _id: '$specs.transmission', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  res.json({
    byCategory,
    byMake,
    byYear,
    byFuel,
    byTransmission
  });
});

module.exports = {
  getDashboardStats,
  getCarStats
};