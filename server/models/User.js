const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    rentals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rental",
      },
    ],
    avatar: {
      type: String, // URL to avatar image
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add car to favorites
userSchema.methods.addFavorite = function (carId) {
  if (!this.favorites.includes(carId)) {
    this.favorites.push(carId);
    return this.save();
  }
  return this;
};

// Remove car from favorites
userSchema.methods.removeFavorite = function (carId) {
  this.favorites = this.favorites.filter(
    (fav) => fav.toString() !== carId.toString()
  );
  return this.save();
};

// Check if car is in favorites
userSchema.methods.isFavorite = function (carId) {
  return this.favorites.some((fav) => fav.toString() === carId.toString());
};

module.exports = mongoose.model("User", userSchema);
