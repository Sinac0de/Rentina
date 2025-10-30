const Car = require("../models/Car");
const Blog = require("../models/Blog");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    Global search across blogs and users (cars now handled by frontend)
// @route   GET /api/search
// @access  Public
const globalSearch = asyncHandler(async (req, res) => {
  const query = req.query.q;
  const limit = parseInt(req.query.limit) || 5;

  if (!query) {
    return res.json({
      cars: [],
      blogs: [],
    });
  }

  // Escape special regex characters
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Search blogs by title, excerpt, or content
  const blogs = await Blog.find({
    $and: [
      {
        $or: [
          { title: { $regex: escapedQuery, $options: "i" } },
          { excerpt: { $regex: escapedQuery, $options: "i" } },
          { content: { $regex: escapedQuery, $options: "i" } },
        ],
      },
      { published: true },
    ],
  })
    .populate("author", "name")
    .limit(limit);

  res.json({
    cars: [], // Cars now handled by frontend using getCars
    blogs,
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
    // Escape special regex characters
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Split the search query into words
    const searchTerms = escapedQuery.trim().split(/\s+/);

    // For each term, create an OR condition for make, model, or specs.type
    filter.$and = searchTerms.map((term) => ({
      $or: [
        { make: { $regex: term, $options: "i" } },
        { model: { $regex: term, $options: "i" } },
        { "specs.type": { $regex: term, $options: "i" } },
      ],
    }));
  }

  // Additional filters from query params
  if (req.query.category) {
    filter["specs.type"] = req.query.category;
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
