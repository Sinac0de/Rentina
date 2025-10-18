const express = require('express');
const { 
  getFavorites, 
  addFavorite, 
  removeFavorite,
  checkFavorite
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getFavorites);

router.route('/check/:id')
  .get(protect, checkFavorite);

router.route('/:id')
  .post(protect, addFavorite)
  .delete(protect, removeFavorite);

module.exports = router;