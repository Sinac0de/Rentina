import BillingInfo from "./Parts/BillingInfo";
import Confirmation from "./Parts/Confirmation";
import PaymentMethod from "./Parts/PaymentMethod";
import RentalInfo from "./Parts/RentalInfo";
import RentalSummary from "./Parts/RentalSummary";

const Payment = () => {
  return (
    <div className="relative p-5 md:p-10 flex flex-col gap-6 md:flex-row justify-center">
      <div className="md:order-2 lg:w-2/3 md:1/5 sticky top-36 h-fit">
        <RentalSummary />
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
