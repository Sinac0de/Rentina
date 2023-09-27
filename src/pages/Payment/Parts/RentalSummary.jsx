import RatingStars from "src/components/common/RatingStars";
import carImg from "src/assets/images/Cars/test/car-img-1_1.png";
import { useState } from "react";
import TextInput from "src/components/common/TextInput";
import { calTotalPrice } from "src/utils/usefulFunctions";

const RentalSummary = ({ info }) => {
  const { id, make, model, specs, img_urls } = info;
  const { rental_price, discount_percent } = specs;

  // Calculate the total price
  const totalPrice = calTotalPrice(rental_price, discount_percent);

  const [promoCode, setPromoCode] = useState("");

  const handleChange = (e) => {
    setPromoCode(e.target.value);
  };

  return (
    <div className="bg-white w-full overflow-hidden p-5 rounded-[10px] flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold text-secondary-500 md:text-xl">
          Rental Summary
        </h3>
        <p className="text-xs font-medium text-secondary-300 leading-5 md:text-sm">
          Prices may change depending on the length of the rental and the price
          of your rental car.
        </p>
      </div>

      {/* body */}
      <div className="flex flex-col gap-5">
        <div className="flex border-b-[1px] border-[#C3D4E966]/40 pb-5 gap-5">
          <img
            src={img_urls[1].src}
            className="flex-1 max-w-[35%] object-contain rounded-[10px]"
          />
          <div className="flex-1 flex flex-col gap-4 lg:gap-3">
            <h2 className="text-xl font-bold lg:text-3xl md:text-2xl">
              {`${make} ${model}`}
            </h2>
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2 flex-wrap">
              <div className="hidden lg:block">
                <RatingStars isBig={true} />
              </div>
              <div className="block lg:hidden">
                <RatingStars />
              </div>

              <p className="text-xs text-[#3D5278] font-medium lg:text-sm">
                440+ Reviewer
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between font-semibold items-center">
            <p className="text-xs text-secondary-300 md:text-base">Subtotal</p>
            <span className="text-base">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold items-center">
            <p className="text-xs text-secondary-300 md:text-base">Tax</p>
            <span className="text-base">$0.00</span>
          </div>
        </div>

        {/* promo code */}
        <TextInput
          button={{
            value: promoCode,
            title: "Apply now",
          }}
          onChange={handleChange}
          placeHolder="Promo Code"
        />
      </div>
      {/* footer */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-base text-secondary-500 font-bold md:text-xl">
            Total Rental Price
          </h3>
          <p className="text-xs text-secondary-300 md:text-sm">
            Overall price rental
          </p>
        </div>
        <div className="flex justify-end items-center">
          <h2 className="font-bold text-xl text-secondary-500 md:text-3xl">
            ${totalPrice.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RentalSummary;
