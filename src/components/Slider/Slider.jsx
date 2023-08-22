import { Link } from "react-router-dom";
import CarCard from "../CarCard/CarCard";

const Slider = ({ title }) => {
  return (
    <section>
      <header className="flex justify-between mb-5">
        <h3>{title}</h3>
        <Link to="." className="text-primary-500 font-semibold">
          <p>View all</p>
        </Link>
      </header>
      {/* slides */}
      <div className="flex overflow-auto gap-5 relative">
        <CarCard isSlideCard={true} />
        <CarCard isSlideCard={true} />
        <CarCard isSlideCard={true} />
        <CarCard isSlideCard={true} />
        <CarCard isSlideCard={true} />
      </div>
    </section>
  );
};

export default Slider;
