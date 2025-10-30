import CarReviews from "./parts/CarReviews/CarReviews";
import CarPhotos from "./parts/CarPhotos/CarPhotos";
import CarInfo from "./parts/CarInfo/CarInfo";
import Slider from "src/components/Slider/Slider";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { getCarById } from "src/services/api";
import SkeletonPhotos from "./parts/CarPhotos/SkeletonPhotos";
import SkeletonInfo from "./parts/CarInfo/SkeletonInfo";
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
      try {
        const data = await getCarById(id);
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCarDetails();
  }, [id]);

  /*--- Skeleton loading ---*/
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col gap-5 py-8">
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
    <div className="max-w-7xl mx-auto flex flex-col gap-5 py-8">
      <div className="flex flex-col gap-7 lg:flex-row">
        <CarPhotos photos={carData.img_urls} /> <CarInfo info={carData} />
      </div>

      <CarReviews reviews={carData.reviews} />
      <Slider title="Recent Cars" />
      <Slider title="Recomendation Cars" />
    </div>
  );
};

export default CarDetails;
