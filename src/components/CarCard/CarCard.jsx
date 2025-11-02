import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { addFavorite, checkFavorite, removeFavorite } from "src/services/api";
import useAuthStore from "src/store/authStore";
import FuelIcon from "../../assets/Icons/FuelIcon";
import HeartFilled from "../../assets/Icons/HeartFilled";
import HeartOutlined from "../../assets/Icons/HeartOutlined";
import PeopleIcon from "../../assets/Icons/PeopleIcon";
import TransmissionIcon from "../../assets/Icons/TransmissionIcon";

const CarCard = ({
  isSlideCard = false,
  carData,
  isRented = false,
  rentalData,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const filterParams = location.search;
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();

  // Check if car is favorited when component mounts and when auth status changes
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!isAuthenticated || !carData?._id) return;

      try {
        const response = await checkFavorite(carData._id);
        setIsFavorite(response.isFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkIfFavorite();
  }, [isAuthenticated, carData?._id]);

  if (!carData) return null;

  const { _id: id, make, model, specs, thumbnail_img, rating } = carData;

  const carInfo = [
    {
      id: 1,
      name: "Fuel",
      desc: specs.fuel_capacity,
      icon: <FuelIcon />,
    },
    {
      id: 2,
      name: "Transmission",
      desc: specs.transmission,
      icon: <TransmissionIcon />,
    },
    {
      id: 3,
      name: "Capacity",
      desc: `${specs.seats} seats`,
      icon: <PeopleIcon />,
    },
  ];

  // to add/remove item from the favorites
  const handleFavorite = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/signin");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      if (isFavorite) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorite status");
    } finally {
      setLoading(false);
    }
  };

  // Handle rent button click
  const handleRent = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/signin");
      return;
    }
    // If authenticated, proceed to payment page
    navigate(filterParams ? `/payment/${id}${filterParams}` : `/payment/${id}`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="dark:bg-slate-600 flex flex-col gap-5 bg-white rounded-lg p-3 h-full hover:shadow-md transition-all duration-200"
    >
      {/* card header */}
      <div className="flex justify-between">
        <Link
          className="flex flex-col p-0"
          to={filterParams ? `/cars/${id}${filterParams}` : `/cars/${id}`}
        >
          <h3 className="dark:text-slate-300 text-base font-semibold text-secondary-500 mb-1">
            {`${make} ${model}`}
          </h3>
          <h5 className="text-xs font-medium text-secondary-300">
            {specs.type}
          </h5>
        </Link>
        {/* favorite icon */}
        <button
          className="h-fit mt-1 text-9xl"
          onClick={handleFavorite}
          disabled={loading}
        >
          {isFavorite ? (
            <HeartFilled isBig={isSlideCard} />
          ) : (
            <HeartOutlined isBig={isSlideCard} />
          )}
        </button>
      </div>
      {/* card body */}
      <Link
        to={filterParams ? `/cars/${id}${filterParams}` : `/cars/${id}`}
        className={`flex ${
          isSlideCard ? "flex-col" : "mb-5"
        } justify-between gap-5`}
      >
        {/* car image & shadow */}
        <div
          className={`relative flex ${
            isSlideCard ? "mb-5 min-h-[100px]" : ""
          } justify-center items-end flex-1`}
        >
          {thumbnail_img ? (
            <img
              src={thumbnail_img}
              className="object-contain"
              alt={`${make} ${model}`}
              loading="lazy"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          )}
          <div className="dark:from-slate-600 dark:to-slate-600/20 w-full h-1/3 bg-gradient-to-t from-white to-black/0 absolute bottom-0"></div>
        </div>
        {/* car info */}
        <div
          className={`flex whitespace-nowrap ${
            !isSlideCard
              ? "flex-col gap-[16px]"
              : "gap-5 justify-around flex-wrap"
          } `}
        >
          {carInfo.map((info) => {
            return (
              <div
                className="flex items-center gap-1 text-secondary-300 text-xs"
                key={info.id}
              >
                {info.icon}
                <span>{info.desc}</span>
              </div>
            );
          })}
        </div>
      </Link>
      {/* rental information if available */}
      {rentalData && (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-2 mb-2">
          <div className="text-xs text-blue-800 dark:text-blue-200">
            <div className="flex justify-between">
              <span>Rental Period:</span>
              <span>
                {formatDate(rentalData.startDate)} -{" "}
                {formatDate(rentalData.endDate)}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Total Price:</span>
              <span className="font-semibold">
                ${rentalData.totalPrice?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* card footer */}
      <div className="flex items-center h-full justify-between">
        {/* price and rating */}
        <div>
          <h3 className="dark:text-slate-300 font-semibold text-base text-secondary-500 lg:text-xl">
            ${specs?.rental_price?.toFixed(2)}/
            <span className="font-medium text-xs text-secondary-300 lg:text-base">
              day
            </span>
          </h3>
          {rating > 0 && (
            <div className="flex items-center mt-1">
              <span className="text-yellow-500">★</span>
              <span className="text-xs text-secondary-300 ml-1">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleRent}
          disabled={isRented}
          className={`py-2 px-[20px] rounded text-xs font-medium ${
            isRented
              ? "dark:text-secondary-200 text-white bg-gray-400 cursor-not-allowed"
              : "dark:text-secondary-200 text-white bg-primary-500 hover:bg-primary-600"
          }`}
        >
          {isRented ? "Rented" : "Rent now"}
        </button>
      </div>
    </motion.div>
  );
};

export default CarCard;
