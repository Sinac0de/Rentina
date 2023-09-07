import RentalSummary from "./Parts/RentalSummary";

const Payment = () => {
  return (
    <div className="p-5">
      <RentalSummary />

      <div>{/* Billing Info */}</div>

      <div>{/* Rental Info */}</div>

      <div>{/* Payment Method */}</div>

      <div>{/* Confirmation */}</div>
    </div>
  );
};

export default Payment;
