const express = require('express');
const { 
  getCars, 
  getCarById, 
  createCar, 
  updateCar, 
  deleteCar,
  getCarCategories,
  getCarMakes,
  favoriteCar,
  unfavoriteCar,
  getFavoriteCars
} = require('../controllers/carController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getCars)
  .post(protect, admin, createCar);

router.route('/categories')
  .get(getCarCategories);

router.route('/makes')
  .get(getCarMakes);

router.route('/favorites')
  .get(protect, getFavoriteCars);

router.route('/:id')
  .get(getCarById)
  .put(protect, admin, updateCar)
  .delete(protect, admin, deleteCar);

router.route('/:id/favorite')
  .post(protect, favoriteCar)
  .delete(protect, unfavoriteCar);

module.exports = router;