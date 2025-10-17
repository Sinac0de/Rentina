const Car = require('../models/Car');
const asyncHandler = require('express-async-handler');

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({});
  res.json(cars);
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
    throw new Error('Car not found');
  }
});

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = asyncHandler(async (req, res) => {
  const car = new Car({
    make: 'Sample Make',
    model: 'Sample Model',
    year: 2023,
    pricePerDay: 0,
    specs: {
      fuel: 'Petrol',
      transmission: 'Manual',
      capacity: 5,
      steering: 'Left'
    },
    images: []
  });
  
  const createdCar = await car.save();
  res.status(201).json(createdCar);
});

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  const { make, model, year, pricePerDay, specs, images, availability } = req.body;
  
  const car = await Car.findById(req.params.id);
  
  if (car) {
    car.make = make || car.make;
    car.model = model || car.model;
    car.year = year || car.year;
    car.pricePerDay = pricePerDay || car.pricePerDay;
    car.specs = specs || car.specs;
    car.images = images || car.images;
    car.availability = availability !== undefined ? availability : car.availability;
    
    const updatedCar = await car.save();
    res.json(updatedCar);
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
});

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  
  if (car) {
    await car.remove();
    res.json({ message: 'Car removed' });
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
});

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};