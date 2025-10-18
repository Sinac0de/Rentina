import { getCars } from "src/services/api";
import BillingInfo from "./Parts/BillingInfo";
import Confirmation from "./Parts/Confirmation";
import PaymentMethod from "./Parts/PaymentMethod";
import RentalInfo from "./Parts/RentalInfo";
import RentalSummary from "./Parts/RentalSummary";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Payment = () => {
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

  if (isLoading) {
    return <h4>Loading car data...</h4>;
  }

  return (
    <div className="relative p-5 md:p-10 flex flex-col gap-6 lg:flex-row justify-center">
      <div className="lg:order-2 lg:w-2/3 md:w-full lg:sticky top-36 h-fit">
        <RentalSummary info={carData} />
      </div>

      <div className="md:order-1 flex flex-col gap-6 w-full">
        <BillingInfo />
        <RentalInfo />
        <PaymentMethod />
        <Confirmation />
      </div>
    </div>
  );
};

export default Payment;
