const Car = require("../models/Car");
const Blog = require("../models/Blog");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    Global search across cars, blogs, and users
// @route   GET /api/search
// @access  Public
const globalSearch = asyncHandler(async (req, res) => {
  const query = req.query.q;
  const limit = parseInt(req.query.limit) || 5;

  if (!query) {
    return res.json({
      cars: [],
      blogs: [],
      users: [],
    });
  }

  // Search cars by make or model
  const cars = await Car.find({
    $or: [
      { make: { $regex: query, $options: "i" } },
      { model: { $regex: query, $options: "i" } },
    ],
    availability: true,
  }).limit(limit);

  // Search blogs by title or content
  const blogs = await Blog.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
    published: true,
  })
    .populate("author", "name")
    .limit(limit);

  // Search users by name (only for admin, limited for public)
  const users = await User.find({
    name: { $regex: query, $options: "i" },
  })
    .select("name email role")
    .limit(req.user && req.user.role === "admin" ? limit : 0);

  res.json({
    cars,
    blogs,
    users,
  });
});

// @desc    Search cars with advanced filtering
// @route   GET /api/search/cars
// @access  Public
const searchCars = asyncHandler(async (req, res) => {
  const query = req.query.q;
  const limit = parseInt(req.query.limit) || 12;

  let filter = { availability: true };

  if (query) {
    // Split the search query into words
    const searchTerms = query.trim().split(/\s+/);

    // For each term, create an OR condition for make or model
    filter.$and = searchTerms.map((term) => ({
      $or: [
        { make: { $regex: term, $options: "i" } },
        { model: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
      ],
    }));
  }

  // Additional filters from query params
  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    filter.pricePerDay = {};
    if (req.query.minPrice)
      filter.pricePerDay.$gte = parseInt(req.query.minPrice);
    if (req.query.maxPrice)
      filter.pricePerDay.$lte = parseInt(req.query.maxPrice);
  }

  const cars = await Car.find(filter)
    .limit(limit)
    .sort({ rating: -1, createdAt: -1 });

  res.json(cars);
});

module.exports = {
  globalSearch,
  searchCars,
};
