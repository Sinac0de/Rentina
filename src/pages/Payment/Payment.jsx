import BillingInfo from "./Parts/BillingInfo";
import RentalSummary from "./Parts/RentalSummary";

const Payment = () => {
  return (
    <div className="p-5">
      <RentalSummary />

      <BillingInfo />

      <div>{/* Rental Info */}</div>

      <div>{/* Payment Method */}</div>

      <div>{/* Confirmation */}</div>
    </div>
  );
};

export default Payment;
