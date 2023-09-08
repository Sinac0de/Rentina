import CarReviews from "./parts/CarReviews/CarReviews";
import CarPhotos from "./parts/CarPhotos";
import CarInfo from "./parts/CarInfo";
import Slider from "src/components/Slider/Slider";

const CarDetails = () => {
  return (
    <div className="flex flex-col gap-5 py-8">
      <div className="flex flex-col gap-7 lg:flex-row">
        <CarPhotos />
        <CarInfo />
      </div>

      <CarReviews />
      <Slider title="Recent Cars" />
      <Slider title="Recomendation Cars" />
    </div>
  );
};

export default CarDetails;
