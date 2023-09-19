import CarReviews from "./parts/CarReviews/CarReviews";
import CarPhotos from "./parts/CarPhotos";
import CarInfo from "./parts/CarInfo";
import Slider from "src/components/Slider/Slider";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getCars } from "src/services/api";

const CarDetails = () => {
  const [carData, setCarData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // fetch car data
    async function fetchCarDetails() {
      setCarData(await getCars(id));
    }
    fetchCarDetails();
  }, []);

  if (!carData.id) {
    return <h4>Loading car data...</h4>;
  }

  return (
    <div className="flex flex-col gap-5 py-8">
      <div className="flex flex-col gap-7 lg:flex-row">
        <CarPhotos photos={carData.img_urls} />
        <CarInfo info={carData} />
      </div>

      <CarReviews />
      <Slider title="Recent Cars" />
      <Slider title="Recomendation Cars" />
    </div>
  );
};

export default CarDetails;
