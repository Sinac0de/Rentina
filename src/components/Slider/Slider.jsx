import { Link } from "react-router-dom";
import CarCard from "../CarCard/CarCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Slider = ({ title }) => {
  return (
    <section>
      <header className="flex justify-between mb-5">
        <h3>{title}</h3>
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
        className="mySwiper "
      >
        <SwiperSlide>
          <CarCard isSlideCard={true} />
        </SwiperSlide>
        <SwiperSlide>
          <CarCard isSlideCard={true} />
        </SwiperSlide>
        <SwiperSlide>
          <CarCard isSlideCard={true} />
        </SwiperSlide>
        <SwiperSlide>
          <CarCard isSlideCard={true} />
        </SwiperSlide>
        <SwiperSlide>
          <CarCard isSlideCard={true} />
        </SwiperSlide>
        <SwiperSlide>
          <CarCard isSlideCard={true} />
        </SwiperSlide>
        <SwiperSlide>
          <CarCard isSlideCard={true} />
        </SwiperSlide>
        <SwiperSlide>
          <CarCard isSlideCard={true} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Slider;
