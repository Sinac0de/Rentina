const Booking = require('../models/Booking');
const Car = require('../models/Car');
const asyncHandler = require('express-async-handler');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { carId, startDate, endDate } = req.body;
  
  // Calculate total days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Get car to calculate price
  const car = await Car.findById(carId);
  
  if (!car) {
    res.status(404);
    throw new Error('Car not found');
  }
  
  // Calculate total price
  const totalPrice = diffDays * car.pricePerDay;
  
  // Create booking
  const booking = new Booking({
    user: req.user._id,
    car: carId,
    startDate,
    endDate,
    totalPrice
  });
  
  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
});

module.exports = {
  createBooking,
  getMyBookings
};