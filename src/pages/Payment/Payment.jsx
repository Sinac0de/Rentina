import BillingInfo from "./Parts/BillingInfo";
import RentalInfo from "./Parts/RentalInfo";
import RentalSummary from "./Parts/RentalSummary";

const Payment = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-6 md:flex-row justify-center">
      <div className="md:order-2 lg:w-1/3 md:2/5">
        <RentalSummary />
      </div>

      <div className="md:order-1 md:w-3/5 flex flex-col gap-6 w-full">
        <BillingInfo />
        <RentalInfo />
      </div>
    </div>
  );
};

export default Payment;
