const asyncHandler = require("../middleware/asyncHandler");
const Rental = require("../models/Rental");
const Car = require("../models/Car");
const User = require("../models/User");

// @desc    Create a new rental
// @route   POST /api/rentals
// @access  Private
const createRental = asyncHandler(async (req, res) => {
  const {
    carId,
    startDate,
    endDate,
    pickupLocation,
    dropoffLocation,
    totalPrice,
    paymentMethod,
    billingInfo,
  } = req.body;

  // Validate required fields with detailed error messages
  const missingFields = [];

  if (!carId) missingFields.push("carId");
  if (!startDate) missingFields.push("startDate");
  if (!endDate) missingFields.push("endDate");
  if (!pickupLocation) missingFields.push("pickupLocation");
  if (!dropoffLocation) missingFields.push("dropoffLocation");
  if (totalPrice === undefined || totalPrice === null)
    missingFields.push("totalPrice");
  if (!paymentMethod) missingFields.push("paymentMethod");
  if (!billingInfo) {
    missingFields.push("billingInfo");
  } else {
    // Check billingInfo fields
    if (!billingInfo.name) missingFields.push("billingInfo.name");
    if (!billingInfo.address) missingFields.push("billingInfo.address");
    if (!billingInfo.phoneNumber) missingFields.push("billingInfo.phoneNumber");
    if (!billingInfo.townCity) missingFields.push("billingInfo.townCity");
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Validate data types
  if (isNaN(new Date(startDate).getTime())) {
    return res.status(400).json({
      success: false,
      error: "Invalid startDate format",
    });
  }

  if (isNaN(new Date(endDate).getTime())) {
    return res.status(400).json({
      success: false,
      error: "Invalid endDate format",
    });
  }

  if (typeof totalPrice !== "number" || totalPrice < 0) {
    return res.status(400).json({
      success: false,
      error: "totalPrice must be a valid positive number",
    });
  }

  // Check if car exists
  const car = await Car.findById(carId);
  if (!car) {
    return res.status(404).json({
      success: false,
      error: "Car not found",
    });
  }

  // Check if car is available
  if (!car.availability) {
    return res.status(400).json({
      success: false,
      error: "Car is not available for rental",
    });
  }

  // Create rental
  const rental = await Rental.create({
    user: req.user.id,
    car: carId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    pickupLocation,
    dropoffLocation,
    totalPrice,
    paymentMethod,
    billingInfo,
  });

  // Add rental to user's rentals array
  const user = await User.findById(req.user.id);
  user.rentals = user.rentals || [];
  user.rentals.push(rental._id);
  await user.save();

  // Mark car as unavailable
  car.availability = false;
  await car.save();

  res.status(201).json({
    success: true,
    data: rental,
  });
});

// @desc    Get all rentals for logged in user
// @route   GET /api/rentals
// @access  Private
const getUserRentals = asyncHandler(async (req, res) => {
  const rentals = await Rental.find({ user: req.user.id })
    .populate("car", "make model year images specs thumbnail_img")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: rentals.length,
    data: rentals,
  });
});

// @desc    Get rental by ID
// @route   GET /api/rentals/:id
// @access  Private
const getRentalById = asyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.id)
    .populate("user", "name email")
    .populate("car", "make model year images specs");

  if (!rental) {
    return res.status(404).json({
      success: false,
      error: "Rental not found",
    });
  }

  // Make sure user is owner of rental
  if (rental.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: "Not authorized to view this rental",
    });
  }

  res.status(200).json({
    success: true,
    data: rental,
  });
});

module.exports = {
  createRental,
  getUserRentals,
  getRentalById,
};
