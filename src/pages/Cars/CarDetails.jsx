import StarFilledIcon from "../../components/Icons/StarFilledIcon";
import StarOutlineIcon from "../../components/Icons/StarOutlineIcon";

import bigImg from "../../assets/images/Cars/test/car-img-1.png";
import smallImg1 from "../../assets/images/Cars/test/car-img-1.png";
import smallImg2 from "../../assets/images/Cars/test/car-img-2.png";
import smallImg3 from "../../assets/images/Cars/test/car-img-3.png";

const CarDetails = () => {
  return (
    <div className="pt-8">
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
      <div>
        {/* info header */}
        <div>
          <h2></h2>
          <div>
            <div>
              <StarFilledIcon />
              <StarFilledIcon />
              <StarFilledIcon />
              <StarFilledIcon />
              <StarOutlineIcon />
            </div>
            <h4>440+ Reviewer</h4>
          </div>
        </div>
        {/* info body */}
        <div>
          <p>
            NISMO has become the embodiment of Nissan's outstanding performance,
            inspired by the most unforgiving proving ground, the "race track".
          </p>
          {/* car specs */}
          <div>
            <div>
              <div>Type Car Sport</div>
              <div>Steering Manual</div>
            </div>
            <div>
              <div>Capacity 2 Person</div>
              <div>Gasoline 70 L</div>
            </div>
          </div>
        </div>
        {/* info footer */}
        <div>
          <div className="flex items-center justify-between">
            {/* price and discount */}
            <div>
              <h3 className="font-semibold text-base text-secondary-500">
                $74.00/
                <span className="font-medium text-xs text-secondary-300">
                  day
                </span>
              </h3>
              <h4 className="text-xs text-secondary-300 line-through">
                $80.00
              </h4>
            </div>

            <button className="bg-primary-500 py-2 px-[20px] rounded text-xs font-medium">
              Rent now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
