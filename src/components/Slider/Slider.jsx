import { Link } from "react-router-dom";
import CarCard from "../CarCard/CarCard";
import { useEffect, useState } from "react";
import { getCars } from "src/services/api";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SkeletonCard from "../CarCard/SkeletonCard";

const Slider = ({ title }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // fetch all cars
    async function fetchCars() {
      setCars(await getCars());
    }
    fetchCars();
  }, []);

  /* --- Skeleton Loading --- */
  if (!cars.length) {
    return (
      <section className="my-2">
        <header className="flex justify-between mb-5">
          <h3 className="text-secondary-300 font-semibold text-sm md:text-base md:px-2">
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
        <h3 className="text-secondary-300 font-semibold text-sm md:text-base md:px-2">
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
        {cars.slice(24, 32).map((car) => {
          return (
            <SwiperSlide key={car._id}>
              <CarCard isSlideCard carData={car} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Slider;
