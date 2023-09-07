import RatingStars from "src/components/RatingStars";
import carImg from "src/assets/images/Cars/test/car-img-1_1.png";
import { Input } from "@material-tailwind/react";

const RentalSummary = () => {
  return (
    <div className="bg-white w-full overflow-hidden p-5 rounded-[10px] flex flex-col gap-5 md:max-w-md">
      {/* header */}
      <div>
        <h3 className="text-base font-bold text-secondary-500">
          Rental Summary
        </h3>
        <p className="text-xs font-medium text-secondary-300 leading-5">
          Prices may change depending on the length of the rental and the price
          of your rental car.
        </p>
      </div>

      {/* body */}
      <div className="flex flex-col gap-5">
        <div className="flex border-b-[1px] border-[#C3D4E966]/40 pb-5 gap-5">
          <img src={carImg} className="flex-1 max-w-[35%] object-contain" />
          <div className="flex-1 flex flex-col gap-5">
            <h2 className="text-xl font-bold">Nissan GT - R</h2>
            <div className="flex flex-col gap-1">
              <RatingStars />
              <p className="text-xs text-[#3D5278] font-medium">
                440+ Reviewer
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between font-semibold items-center">
            <p className="text-xs text-secondary-300">Subtotal</p>
            <span className="text-base">$80.00</span>
          </div>
          <div className="flex justify-between font-semibold items-center">
            <p className="text-xs text-secondary-300">Tax</p>
            <span className="text-base">$0</span>
          </div>
        </div>

        {/* promo code */}
        <div>
          <Input
            type="text"
            placeholder="Apply promo code"
            className="bg-[#F6F7F9] text-xs text-secondary-300 font-medium w-full p-3 rounded-[10px]"
          />
        </div>
      </div>
      {/* footer */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-base text-secondary-500">Total Rental Price</h3>
          <p className="text-xs text-secondary-300">Overal price rental</p>
        </div>
        <div className="flex justify-end items-center">
          <h2 className="font-bold text-xl text-secondary-500">$80.00</h2>
        </div>
      </div>
    </div>
  );
};

export default RentalSummary;
