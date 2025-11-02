import { Link } from "react-router";
import CarCard from "../CarCard/CarCard";
import { useEffect, useState } from "react";
import { getCars, getUserRentedCars } from "src/services/api";
import useAuthStore from "src/store/authStore";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SkeletonCard from "../CarCard/SkeletonCard";

const Slider = ({ title }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rentedCarIds, setRentedCarIds] = useState(new Set());
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // fetch user's rented cars
    const fetchRentedCars = async () => {
      if (!isAuthenticated) return;

      try {
        const rentedCarsData = await getUserRentedCars();
        const rentedIds = new Set(
          rentedCarsData.map((rental) => rental.car._id)
        );
        setRentedCarIds(rentedIds);
      } catch (err) {
        console.error("Error fetching rented cars:", err);
      }
    };

    fetchRentedCars();
  }, [isAuthenticated]);

  useEffect(() => {
    // fetch all cars
    async function fetchCars() {
      try {
        // Fetch cars sorted by rating (popular cars)
        const data = await getCars({ sort: "rating", pageSize: 12 });
        setCars(data.cars || []);
      } catch (error) {
        console.error("Error fetching cars for slider:", error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  /* --- Skeleton Loading --- */
  if (loading) {
    return (
      <section className="my-2">
        <header className="flex justify-between mb-5">
          <h3 className="text-secondary-300 font-semibold text-sm lg:text-base lg:px-2">
            {title}
          </h3>
          <Link to="/cars" className="text-primary-500 font-semibold">
            <p>View all</p>
          </Link>
        </header>
        {/* ---Swiper Slider--- */}
        <Swiper
          grabCursor={true}
          spaceBetween="30"
          slidesPerView={"auto"}
          className="mySwiper z-0"
        >
          {/* ---Create 8 skeleton cards--- */}
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index}>
              <SkeletonCard isSlideCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

  /* --- Fetched Content --- */
  return (
    <section className="my-2">
      <header className="flex justify-between mb-5">
        <h3 className="text-secondary-300 font-semibold text-sm lg:text-base lg:px-2">
          {title}
        </h3>
        <Link to="/cars" className="text-primary-500 font-semibold">
          <p>View all</p>
        </Link>
      </header>
      {/* ---Swiper Slider--- */}
      <Swiper
        grabCursor={true}
        spaceBetween="20"
        slidesPerView={"auto"}
        className="mySwiper z-0"
      >
        {cars.slice(0, 8).map((car) => {
          // Changed from slice(24, 32) to slice(0, 8)
          const isRented = rentedCarIds.has(car._id);
          return (
            <SwiperSlide key={car._id}>
              <CarCard isSlideCard carData={car} isRented={isRented} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Slider;
