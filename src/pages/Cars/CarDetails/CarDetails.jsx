import CarReviews from "./parts/CarReviews/CarReviews";
import CarPhotos from "./parts/CarPhotos";
import CarInfo from "./parts/CarInfo";
import Slider from "src/components/Slider/Slider";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getCars } from "src/services/api";
import SkeletonPhotos from "./parts/SkeletonPhotos";
import SkeletonInfo from "./parts/SkeletonInfo";
import SkeletonReviews from "./parts/CarReviews/SkeletonReviews";

const CarDetails = () => {
  const [carData, setCarData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Reset the loading state
    setIsLoading(true);
    // fetch car data
    async function fetchCarDetails() {
      const data = await getCars(id);
      setCarData(data);
      setIsLoading(false); // Set loading to false when data is fetched
    }
    fetchCarDetails();
  }, [id]);

  /*--- Skeleton loading ---*/
  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 py-8">
        <div className="flex flex-col gap-7 lg:flex-row">
          <SkeletonPhotos />
          <SkeletonInfo />
        </div>

        <SkeletonReviews />
        <Slider title="Recent Cars" />
        <Slider title="Recomendation Cars" />
      </div>
    );
  }

  /*--- Fetched Data ---*/
  return (
    <div className="flex flex-col gap-5 py-8">
      <div className="flex flex-col gap-7 lg:flex-row">
        <CarPhotos photos={carData.img_urls} />
        <CarInfo info={carData} />
      </div>

      <CarReviews reviews={carData.reviews} />
      <Slider title="Recent Cars" />
      <Slider title="Recomendation Cars" />
    </div>
  );
};

export default CarDetails;
