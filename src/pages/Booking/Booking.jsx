import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { createBooking, getCarById } from "../../services/api";
import useAuthStore from "src/store/authStore";

const Booking = () => {
  const { id: carId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "Main Office",
    dropoffLocation: "Main Office",
    driverAge: "",
    additionalDriver: false,
    insurance: false,
  });

  const [pricing, setPricing] = useState({
    subtotal: 0,
    insurance: 0,
    tax: 0,
    total: 0,
  });

  // Load car details if carId is provided
  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) {
        setLoading(false);
        return;
      }

      try {
        const carData = await getCarById(carId);
        setCar(carData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load car details");
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  // Calculate pricing when form data changes
  useEffect(() => {
    if (!formData.startDate || !formData.endDate || !car) return;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const subtotal = diffDays * car.pricePerDay;
    const insurance = formData.insurance ? subtotal * 0.1 : 0; // 10% for insurance
    const tax = (subtotal + insurance) * 0.08; // 8% tax
    const total = subtotal + insurance + tax;

    setPricing({
      subtotal,
      insurance,
      tax,
      total,
    });
  }, [formData, car]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/signin");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setError("Please select both start and end dates");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start >= end) {
      setError("End date must be after start date");
      return;
    }

    setBookingLoading(true);
    setError("");

    try {
      const bookingData = {
        carId: car._id,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      await createBooking(bookingData);
      setSuccess(true);

      // Redirect to profile or bookings page after 2 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create booking");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!car && carId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
            Car Not Found
          </h2>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            The car you&#39;re trying to book could not be found.
          </p>
          <Link
            to="/cars"
            className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Available Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
              Complete Your Booking
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {car ? `Booking ${car.make} ${car.model}` : "Start a new booking"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-8 dark:bg-gray-800 dark:shadow-gray-700">
                <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">
                  Booking Details
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                        Pickup Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                        Drop-off Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                        Pickup Location
                      </label>
                      <select
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="Main Office">Main Office</option>
                        <option value="Airport">Airport</option>
                        <option value="Downtown">Downtown</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                        Drop-off Location
                      </label>
                      <select
                        name="dropoffLocation"
                        value={formData.dropoffLocation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="Main Office">Main Office</option>
                        <option value="Airport">Airport</option>
                        <option value="Downtown">Downtown</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mb-8 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 dark:text-white">
                      Additional Options
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="insurance"
                          name="insurance"
                          checked={formData.insurance}
                          onChange={handleChange}
                          className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-500"
                        />
                        <label
                          htmlFor="insurance"
                          className="ml-3 text-gray-700 dark:text-gray-300"
                        >
                          Premium Insurance Package (+10% of rental cost)
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="additionalDriver"
                          name="additionalDriver"
                          checked={formData.additionalDriver}
                          onChange={handleChange}
                          className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-500"
                        />
                        <label
                          htmlFor="additionalDriver"
                          className="ml-3 text-gray-700 dark:text-gray-300"
                        >
                          Additional Driver ($15/day)
                        </label>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/30 dark:border-red-700">
                      <p className="text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/30 dark:border-green-700">
                      <p className="text-green-700 dark:text-green-300">
                        Booking created successfully! Redirecting to your
                        profile...
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={bookingLoading || success}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-colors ${
                        bookingLoading || success
                          ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                          : "bg-primary hover:bg-primary-600"
                      }`}
                    >
                      {bookingLoading ? "Processing..." : "Confirm Booking"}
                    </button>

                    <Link
                      to="/cars"
                      className="py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>

              {/* Car Selection if no car is selected */}
              {!car && (
                <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800 dark:shadow-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">
                    Select a Car
                  </h2>
                  <p className="text-gray-600 mb-4 dark:text-gray-300">
                    You haven&#39;t selected a car yet. Browse our collection to
                    find the perfect vehicle for your needs.
                  </p>
                  <Link
                    to="/cars"
                    className="inline-block bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Browse Available Cars
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              {car ? (
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-8 dark:bg-gray-800 dark:shadow-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">
                    Booking Summary
                  </h2>

                  {/* Car Info */}
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={car.thumbnail_img || car.images?.[0]}
                        alt={`${car.make} ${car.model}`}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {car.make} {car.model}
                        </h3>
                        <p className="text-gray-600 text-sm dark:text-gray-300">
                          {car.year} • {car.specs.transmission}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span>{car.specs.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Seats:</span>
                        <span>{car.specs.seats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Type:</span>
                        <span>Petrol</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 mb-4 dark:text-white">
                      Price Breakdown
                    </h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="dark:text-gray-300">Subtotal:</span>
                        <span className="dark:text-gray-300">
                          ${pricing.subtotal.toFixed(2)}
                        </span>
                      </div>

                      {formData.insurance && (
                        <div className="flex justify-between text-sm">
                          <span className="dark:text-gray-300">Insurance:</span>
                          <span className="dark:text-gray-300">
                            ${pricing.insurance.toFixed(2)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="dark:text-gray-300">Tax (8%):</span>
                        <span className="dark:text-gray-300">
                          ${pricing.tax.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="dark:text-white">Total:</span>
                        <span className="text-primary dark:text-primary-400">
                          ${pricing.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-4 dark:text-gray-400">
                      <p>* All prices include applicable taxes</p>
                      <p>* Final price may vary based on additional options</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-6 dark:bg-gray-800 dark:shadow-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">
                    How Booking Works
                  </h2>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary mt-0.5 dark:text-primary-400">
                        •
                      </div>
                      <span className="ml-2">
                        Select your desired car and dates
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary mt-0.5 dark:text-primary-400">
                        •
                      </div>
                      <span className="ml-2">
                        Add any additional options you need
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary mt-0.5 dark:text-primary-400">
                        •
                      </div>
                      <span className="ml-2">Review your booking summary</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary mt-0.5 dark:text-primary-400">
                        •
                      </div>
                      <span className="ml-2">
                        Confirm and receive your booking confirmation
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
