const Car = require("../models/Car");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    Get all cars with pagination and filtering
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 12;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * pageSize;

  // Build filter object
  const filter = {};

  // Filter by availability
  if (req.query.availability !== undefined) {
    filter.availability = req.query.availability === "true";
  }

  // Filter by make
  if (req.query.make) {
    filter.make = { $regex: req.query.make, $options: "i" };
  }

  // Filter by model
  if (req.query.model) {
    filter.model = { $regex: req.query.model, $options: "i" };
  }

  // Filter by category
  if (req.query.category) {
    filter["specs.type"] = req.query.category;
  }

  // Filter by year range
  if (req.query.minYear || req.query.maxYear) {
    filter.year = {};
    if (req.query.minYear) filter.year.$gte = parseInt(req.query.minYear);
    if (req.query.maxYear) filter.year.$lte = parseInt(req.query.maxYear);
  }

  // Filter by price range
  if (req.query.minPrice || req.query.maxPrice) {
    filter.pricePerDay = {};
    if (req.query.minPrice)
      filter.pricePerDay.$gte = parseInt(req.query.minPrice);
    if (req.query.maxPrice)
      filter.pricePerDay.$lte = parseInt(req.query.maxPrice);
  }

  // Filter by specs
  if (req.query.fuel) {
    filter["specs.fuel"] = req.query.fuel;
  }

  if (req.query.transmission) {
    filter["specs.transmission"] = req.query.transmission;
  }

  if (req.query.capacity) {
    filter["specs.capacity"] = parseInt(req.query.capacity);
  }

  // Search by make or model
  if (req.query.search) {
    filter.$or = [
      { make: { $regex: req.query.search, $options: "i" } },
      { model: { $regex: req.query.search, $options: "i" } },
    ];
  }

  // Build sort object
  let sort = { createdAt: -1 }; // Default sort by newest

  if (req.query.sort) {
    switch (req.query.sort) {
      case "price-low":
        sort = { pricePerDay: 1 };
        break;
      case "price-high":
        sort = { pricePerDay: -1 };
        break;
      case "year-new":
        sort = { year: -1 };
        break;
      case "year-old":
        sort = { year: 1 };
        break;
      case "rating":
        sort = { rating: -1 };
        break;
    }
  }

  const totalCars = await Car.countDocuments(filter);
  const cars = await Car.find(filter).sort(sort).limit(pageSize).skip(skip);

  res.json({
    cars,
    page,
    pages: Math.ceil(totalCars / pageSize),
    total: totalCars,
  });
});

// @desc    Get car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    res.json(car);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = asyncHandler(async (req, res) => {
  const { make, model, year, pricePerDay, category, specs, images } = req.body;

  const car = new Car({
    make,
    model,
    year,
    pricePerDay,
    category,
    specs,
    images: images || [],
  });

  const createdCar = await car.save();
  res.status(201).json(createdCar);
});

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  const {
    make,
    model,
    year,
    pricePerDay,
    category,
    specs,
    images,
    availability,
  } = req.body;

  const car = await Car.findById(req.params.id);

  if (car) {
    car.make = make || car.make;
    car.model = model || car.model;
    car.year = year || car.year;
    car.pricePerDay = pricePerDay || car.pricePerDay;
    car.category = category || car.category;
    car.specs = specs || car.specs;
    car.images = images || car.images;
    car.availability =
      availability !== undefined ? availability : car.availability;

    const updatedCar = await car.save();
    res.json(updatedCar);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    await car.remove();
    res.json({ message: "Car removed" });
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Get car categories with counts
// @route   GET /api/cars/categories
// @access  Public
const getCarCategories = asyncHandler(async (req, res) => {
  // First, let's check if there are any cars in the database
  const totalCars = await Car.countDocuments();
  console.log(`Total cars in database: ${totalCars}`);

  // Check how many cars have availability: true
  const availableCars = await Car.countDocuments({ availability: true });
  console.log(`Available cars: ${availableCars}`);

  // Check how many cars have availability: false
  const unavailableCars = await Car.countDocuments({ availability: false });
  console.log(`Unavailable cars: ${unavailableCars}`);

  // Check cars with no availability field
  const noAvailabilityCars = await Car.countDocuments({
    availability: { $exists: false },
  });
  console.log(`Cars with no availability field: ${noAvailabilityCars}`);

  const categories = await Car.aggregate([
    // { $match: { availability: true } },  // Temporarily remove this filter to diagnose the issue
    { $group: { _id: "$specs.type", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  console.log("Categories result:", categories);
  res.json(categories);
});

// @desc    Get car makes with counts
// @route   GET /api/cars/makes
// @access  Public
const getCarMakes = asyncHandler(async (req, res) => {
  // Check what makes we have in the database
  const makes = await Car.aggregate([
    // { $match: { availability: true } },  // Temporarily remove this filter to diagnose the issue
    { $group: { _id: "$make", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  console.log("Makes result:", makes);
  res.json(makes);
});

// @desc    Add car to favorites
// @route   POST /api/cars/:id/favorite
// @access  Private
const favoriteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    const user = await User.findById(req.user._id);
    await user.addFavorite(car._id);
    res.json({ message: "Car added to favorites" });
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Remove car from favorites
// @route   DELETE /api/cars/:id/favorite
// @access  Private
const unfavoriteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    const user = await User.findById(req.user._id);
    await user.removeFavorite(car._id);
    res.json({ message: "Car removed from favorites" });
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Get user's favorite cars
// @route   GET /api/cars/favorites
// @access  Private
const getFavoriteCars = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");
  res.json(user.favorites);
});

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getCarCategories,
  getCarMakes,
  favoriteCar,
  unfavoriteCar,
  getFavoriteCars,
};
