import { Link } from "react-router-dom";
import CarCard from "../CarCard/CarCard";
import { useEffect, useState } from "react";
import { getCars } from "src/services/api";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Slider = ({ title }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // fetch all cars
    async function fetchCars() {
      setCars(await getCars());
    }
    fetchCars();
  }, []);

  if (!cars.length) {
    return <h2>Loading Popular Cars...</h2>;
  }

  return (
    <section className="my-2">
      <header className="flex justify-between mb-5">
        <h3 className="text-secondary-300 font-semibold text-sm md:text-base md:px-2">
          {title}
        </h3>
        <Link to="/shop" className="text-primary-500 font-semibold">
          <p>View all</p>
        </Link>
      </header>
      {/* slides */}
      <Swiper
        grabCursor={true}
        spaceBetween="30"
        slidesPerView={"auto"}
        showsPagination={false}
        modules={[Pagination]}
        className="mySwiper"
      >
        {cars.map((car) => {
          return (
            <SwiperSlide key={car.id}>
              <CarCard isSlideCard={true} carData={car} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Slider;
