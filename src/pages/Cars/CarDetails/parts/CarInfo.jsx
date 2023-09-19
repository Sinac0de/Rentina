import RatingStars from "src/components/common/RatingStars";
import { Link } from "react-router-dom";

const CarInfo = ({ info }) => {
  const { id, make, model, rental_price, discount_percent, specs, reviews } =
    info;

  // Calculate the total price
  const totalDiscount = (rental_price * discount_percent) / 100;
  const totalPrice = rental_price - totalDiscount;

  return (
    <div className="flex flex-col gap-5 bg-white p-4 rounded-[10px] lg:w-1/2 lg:justify-around">
      {/* info header */}
      <div className="flex flex-col gap-1 lg:gap-3">
        <h2 className="text-secondary-500 text-xl lg:text-[32px] font-bold">
          {`${make} ${model}`}
        </h2>
        <div className="flex gap-2 items-center">
          <RatingStars />
          <h4 className="text-xs text-secondary-300 lg:text-[14px]">
            440+ Reviewer
          </h4>
        </div>
      </div>
      {/* info body */}
      <div className="flex flex-col gap-5">
        <p className="text-secondary-300 text-xs lg:text-xl lg:text-secondary-400 font-normal">
          {specs.desc}
        </p>
        {/* car specs */}
        <div className="flex justify-between gap-4 items-center flex-wrap lg:gap-5">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-secondary-300 font-medium text-xs lg:font-normal lg:text-xl">
                Type
              </h3>
              <span className="text-secondary-500 font-semibold text-xs lg:font-normal lg:text-xl">
                {specs.type}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-secondary-300 font-medium text-xs lg:font-normal lg:text-xl">
                Transmission
              </h3>
              <span className="text-secondary-500 font-semibold text-xs lg:font-normal lg:text-xl">
                {specs.transmission}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-secondary-300 font-medium text-xs lg:font-normal lg:text-xl">
                Seating
              </h3>
              <span className="text-secondary-500 font-semibold text-xs lg:font-normal lg:text-xl">
                {`${specs.seats} seats`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-secondary-300 font-medium text-xs lg:font-normal lg:text-xl">
                Fuel Tank Capacity
              </h3>
              <span className="text-secondary-500 font-semibold text-xs lg:font-normal lg:text-xl">
                {`${specs.fuel_capacity.toFixed(1)} gal.`}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* info footer */}
      <div>
        <div className="flex items-center justify-between gap-2">
          {/* price and discount */}
          <div>
            <h3 className="font-semibold text-xl text-secondary-500 lg:text-2xl">
              ${totalPrice.toFixed(2)}/
              <span className="font-medium text-xs text-secondary-300 lg:text-base">
                day
              </span>
            </h3>
            {discount_percent ? (
              <h4 className="text-xs text-secondary-300 line-through lg:text-base">
                ${rental_price.toFixed(2)}
              </h4>
            ) : null}
          </div>

          <Link
            to="/payment/1"
            className="text-white bg-primary-500 py-2 px-[20px] h-full rounded text-base lg:py-4 font-medium"
          >
            Rent now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
