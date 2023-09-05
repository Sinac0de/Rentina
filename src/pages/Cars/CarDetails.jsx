import StarFilledIcon from "../../components/Icons/StarFilledIcon";
import StarOutlineIcon from "../../components/Icons/StarOutlineIcon";

import bigImg from "../../assets/images/Cars/test/car-img-1.png";
import smallImg2 from "../../assets/images/Cars/test/car-img-2.png";
import smallImg3 from "../../assets/images/Cars/test/car-img-3.png";

const CarDetails = () => {
  return (
    <div className="pt-8 flex flex-col gap-7">
      {/* car images */}
      <div className="flex flex-col gap-6">
        <img src={bigImg} className="w-full" />
        <div className="grid grid-cols-3 grid-rows-1 w-full gap-5 h-16">
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
      <div className="flex flex-col gap-5 bg-white p-4 rounded-[10px]">
        {/* info header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-secondary-500 text-xl font-bold">
            Nissan GT - R
          </h2>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1">
              <StarFilledIcon />
              <StarFilledIcon />
              <StarFilledIcon />
              <StarFilledIcon />
              <StarOutlineIcon />
            </div>
            <h4 className="text-xs text-secondary-300">440+ Reviewer</h4>
          </div>
        </div>
        {/* info body */}
        <div className="flex flex-col gap-5">
          <p className="text-secondary-300 text-xs font-normal">
            NISMO has become the embodiment of Nissan's outstanding performance,
            inspired by the most unforgiving proving ground, the "race track".
          </p>
          {/* car specs */}
          <div className="flex justify-between gap-4 items-center">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex justify-between items-center">
                <h3 className="text-secondary-300 font-medium text-xs">
                  Type Car
                </h3>
                <span className="text-secondary-500 font-semibold text-xs">
                  Sport
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-secondary-300 font-medium text-xs">
                  Steering
                </h3>
                <span className="text-secondary-500 font-semibold text-xs">
                  Manual
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex justify-between items-center">
                <h3 className="text-secondary-300 font-medium text-xs">
                  Capacity
                </h3>
                <span className="text-secondary-500 font-semibold text-xs">
                  2 Person
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-secondary-300 font-medium text-xs">
                  Gasoline
                </h3>
                <span className="text-secondary-500 font-semibold text-xs">
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
              <h3 className="font-semibold text-xl text-secondary-500">
                $74.00/
                <span className="font-medium text-xs text-secondary-300">
                  day
                </span>
              </h3>
              <h4 className="text-xs text-secondary-300 line-through">
                $80.00
              </h4>
            </div>

            <button className="bg-primary-500 py-2 px-[20px] h-full rounded text-base font-medium">
              Rent now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
