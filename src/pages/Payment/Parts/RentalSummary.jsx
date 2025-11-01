import { useState } from "react";
import RatingStars from "src/components/common/RatingStars";
import TextInput from "src/components/common/TextInput";
import { calTotalPrice } from "src/utils/utils";

const RentalSummary = ({ info }) => {
  const { _id, make, model, specs, images, pricePerDay } = info;

  // Use pricePerDay if available, otherwise fallback to specs.rental_price
  const rentalPrice = pricePerDay || specs?.rental_price || 0;
  const discountPercent = specs?.discount_percent || 0;

  // Calculate the total price
  const totalPrice = calTotalPrice(rentalPrice, discountPercent);

  // Calculate tax (10%)
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + tax;

  const [promoCode, setPromoCode] = useState("");

  const handleChange = (e) => {
    setPromoCode(e.target.value);
  };

  return (
    <div className="dark:bg-slate-600 bg-white w-full overflow-hidden p-5 rounded-[10px] flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-col gap-1">
        <h3 className="dark:text-slate-300 text-base font-bold text-secondary-500 lg:text-xl">
          Rental Summary
        </h3>
        <p className="text-xs font-medium text-secondary-300 leading-5 lg:text-sm">
          Prices may change depending on the length of the rental and the price
          of your rental car.
        </p>
      </div>

      {/* body */}
      <div className="flex flex-col gap-5">
        <div className="flex border-b-[1px] border-[#C3D4E966]/40 pb-5 gap-5">
          {images?.[0] ? (
            <img
              src={images[0]}
              className="flex-1 max-w-[35%] object-contain rounded-[10px]"
              alt={`${make} ${model}`}
            />
          ) : (
            <div className="flex-1 max-w-[35%] bg-gray-200 border-2 border-dashed rounded-xl dark:bg-gray-700" />
          )}
          <div className="flex-1 flex flex-col gap-4 lg:gap-3">
            <h2 className="dark:text-slate-300 text-xl font-bold lg:text-3xl lg:text-2xl">
              {`${make} ${model}`}
            </h2>
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2 flex-wrap">
              <div className="hidden lg:block">
                <RatingStars isBig={true} />
              </div>
              <div className="block lg:hidden">
                <RatingStars />
              </div>

              <p className="dark:text-slate-300 text-xs text-[#3D5278] font-medium lg:text-sm">
                440+ Reviewer
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between font-medium items-center">
            <p className="dark:text-slate-300 text-xs text-secondary-300 lg:text-base">
              Subtotal
            </p>
            <span className="dark:text-slate-300 text-base">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-medium items-center">
            <p className="dark:text-slate-300 text-xs text-secondary-300 lg:text-base">
              Tax (10%)
            </p>
            <span className="dark:text-slate-300 text-base">
              ${tax.toFixed(2)}
            </span>
          </div>
          {discountPercent > 0 && (
            <div className="flex justify-between font-medium items-center text-green-600">
              <p className="dark:text-green-400 text-xs lg:text-base">
                Discount ({discountPercent}%)
              </p>
              <span className="dark:text-green-400">
                -${(totalPrice * (discountPercent / 100)).toFixed(2)}
              </span>
            </div>
          )}
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
      <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col">
          <h3 className="dark:text-slate-300 text-base text-secondary-500 font-bold lg:text-xl">
            Total Rental Price
          </h3>
          <p className="text-xs text-secondary-300 lg:text-sm">
            Overall price rental
          </p>
        </div>
        <div className="flex justify-end items-center">
          <h2 className="dark:text-slate-300 font-bold text-xl text-secondary-500 lg:text-3xl">
            ${finalTotal.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RentalSummary;
