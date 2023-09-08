import RatingStars from "src/components/common/RatingStars";
import { Link } from "react-router-dom";

const CarInfo = () => {
  return (
    <div className="flex flex-col gap-5 bg-white p-4 rounded-[10px] lg:w-1/2 lg:justify-around">
      {/* info header */}
      <div className="flex flex-col gap-1 lg:gap-3">
        <h2 className="text-secondary-500 text-xl lg:text-[32px] font-bold">
          Nissan GT - R
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
          NISMO has become the embodiment of Nissan's outstanding performance,
          inspired by the most unforgiving proving ground, the "race track".
        </p>
        {/* car specs */}
        <div className="flex justify-between gap-4 items-center lg:gap-5">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex justify-between items-center">
              <h3 className="text-secondary-300 font-medium text-xs lg:font-normal lg:text-xl">
                Type Car
              </h3>
              <span className="text-secondary-500 font-semibold text-xs lg:font-normal lg:text-xl">
                Sport
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-secondary-300 font-medium text-xs lg:font-normal lg:text-xl">
                Steering
              </h3>
              <span className="text-secondary-500 font-semibold text-xs lg:font-normal lg:text-xl">
                Manual
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex justify-between items-center">
              <h3 className="text-secondary-300 font-medium text-xs lg:font-normal lg:text-xl">
                Capacity
              </h3>
              <span className="text-secondary-500 font-semibold text-xs lg:font-normal lg:text-xl">
                2 Person
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-secondary-300 font-medium text-xs lg:font-normal lg:text-xl">
                Gasoline
              </h3>
              <span className="text-secondary-500 font-semibold text-xs lg:font-normal lg:text-xl">
                70 L
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
              $74.00/
              <span className="font-medium text-xs text-secondary-300 lg:text-base">
                day
              </span>
            </h3>
            <h4 className="text-xs text-secondary-300 line-through lg:text-base">
              $80.00
            </h4>
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
