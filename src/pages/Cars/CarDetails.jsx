import StarFilledIcon from "../../components/Icons/StarFilledIcon";
import StarOutlineIcon from "../../components/Icons/StarOutlineIcon";

import bigImg from "../../assets/images/Cars/test/car-img-1.png";
import smallImg2 from "../../assets/images/Cars/test/car-img-2.png";
import smallImg3 from "../../assets/images/Cars/test/car-img-3.png";

const CarDetails = () => {
  return (
    <div className="pt-8 flex flex-col gap-7 lg:flex-row">
      {/* car images */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <img src={bigImg} className="w-full" />
        <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-16 md:flex-1">
          {/* active image */}
          <div className="cursor-pointer p-1 border-[1.5px] border-primary-500 rounded-lg">
            <img
              src={bigImg}
              className="h-full w-full object-cover object-center rounded-md"
            />
          </div>
          <div className="cursor-pointer">
            <img
              src={smallImg2}
              className="h-full w-full object-cover object-center rounded-md"
            />
          </div>
          <div className="cursor-pointer">
            <img
              src={smallImg3}
              className="h-full w-full object-cover object-center rounded-md"
            />
          </div>
        </div>
      </div>

      {/* car info */}
      <div className="flex flex-col gap-5 bg-white p-4 rounded-[10px] lg:w-1/2 lg:justify-around">
        {/* info header */}
        <div className="flex flex-col gap-1 lg:gap-3">
          <h2 className="text-secondary-500 text-xl lg:text-[32px] font-bold">
            Nissan GT - R
          </h2>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <StarFilledIcon />
              <StarFilledIcon />
              <StarFilledIcon />
              <StarFilledIcon />
              <StarOutlineIcon />
            </div>
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

            <button className="bg-primary-500 py-2 px-[20px] h-full rounded text-base lg:py-4 font-medium">
              Rent now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
