import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/authStore";
import CarCard from "../../components/CarCard/CarCard";
import SkeletonCard from "../../components/CarCard/SkeletonCard";
import { getUserRentedCars } from "../../services/api";
import { Car } from "lucide-react";

const RentedCarsPage = () => {
  const { isAuthenticated, checkAuthStatus } = useAuthStore();
  const navigate = useNavigate();
  const [rentedCars, setRentedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthStatus();
      if (!isAuth) {
        navigate("/signin");
      }
    };

    checkAuth();
  }, [checkAuthStatus, navigate]);

  useEffect(() => {
    const fetchRentedCars = async () => {
      if (!isAuthenticated) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getUserRentedCars();
        setRentedCars(data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch rented cars");
      } finally {
        setLoading(false);
      }
    };

    fetchRentedCars();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Rented Cars
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your currently rented and past rented cars
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <p className="mt-2 text-red-600">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : rentedCars.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <Car className="mx-auto text-gray-400" size={48} />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No rented cars yet
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Start renting cars to see them here
            </p>
            <button
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              onClick={() => navigate("/cars")}
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
            {rentedCars.map((rental) => (
              <CarCard
                key={rental._id}
                carData={rental.car}
                isRented={true}
                rentalData={rental}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentedCarsPage;
