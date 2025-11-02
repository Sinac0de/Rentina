const express = require("express");
const {
  createRental,
  getUserRentals,
  getRentalById,
} = require("../controllers/rentalController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createRental).get(protect, getUserRentals);

router.route("/:id").get(protect, getRentalById);

module.exports = router;
