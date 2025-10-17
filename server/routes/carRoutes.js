const express = require('express');
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getCars)
  .post(protect, admin, createCar);

router.route('/:id')
  .get(getCarById)
  .put(protect, admin, updateCar)
  .delete(protect, admin, deleteCar);

module.exports = router;