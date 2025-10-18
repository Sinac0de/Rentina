const express = require('express');
const { globalSearch, searchCars } = require('../controllers/searchController');

const router = express.Router();

router.route('/')
  .get(globalSearch);

router.route('/cars')
  .get(searchCars);

module.exports = router;