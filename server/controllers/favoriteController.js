const User = require('../models/User');
const Car = require('../models/Car');
const asyncHandler = require('express-async-handler');

// @desc    Get user's favorite cars
// @route   GET /api/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  res.json(user.favorites);
});

// @desc    Add car to favorites
// @route   POST /api/favorites/:id
// @access  Private
const addFavorite = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  
  if (car) {
    const user = await User.findById(req.user._id);
    await user.addFavorite(car._id);
    res.json({ message: 'Car added to favorites', favorites: user.favorites });
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
});

// @desc    Remove car from favorites
// @route   DELETE /api/favorites/:id
// @access  Private
const removeFavorite = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  
  if (car) {
    const user = await User.findById(req.user._id);
    await user.removeFavorite(car._id);
    res.json({ message: 'Car removed from favorites', favorites: user.favorites });
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
});

// @desc    Check if car is in favorites
// @route   GET /api/favorites/check/:id
// @access  Private
const checkFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const isFav = user.isFavorite(req.params.id);
  res.json({ isFavorite: isFav });
});

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite
};