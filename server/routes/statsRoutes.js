const express = require('express');
const { getDashboardStats, getCarStats } = require('../controllers/statsController');

const router = express.Router();

router.route('/dashboard')
  .get(getDashboardStats);

router.route('/cars')
  .get(getCarStats);

module.exports = router;