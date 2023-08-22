import HeartOutlined from "../Icons/HeartOutlined";
import carImgUrl from "../../assets/images/Cars/All_New_Rush-SUV.png";
import FuelIcon from "../Icons/FuelIcon";
import TransmissionIcon from "../Icons/TransmissionIcon";
import PeopleIcon from "../Icons/PeopleIcon";

const CarCard = () => {
  const carInfo = [
    { id: 1, name: "Fuel Capacity", desc: "70L", icon: <FuelIcon /> },
    {
      id: 2,
      name: "transmission type",
      desc: "Manual",
      icon: <TransmissionIcon />,
    },
    { id: 3, name: "Capacity", desc: "6 People", icon: <PeopleIcon /> },
  ];

  return (
    <div className="flex flex-col gap-5 bg-white rounded-lg p-3">
      {/* card header */}
      <div className="flex justify-between">
        <div className="flex flex-col p-0">
          <h3 className="text-base font-semibold text-secondary-500 mb-1">
            All New Rush
          </h3>
          <h5 className="text-xs font-medium text-secondary-300">SUV</h5>
        </div>
        {/* favorite icon */}
        <button className="h-fit mt-1">
          <HeartOutlined />
        </button>
      </div>

      {/* card body */}
      <div className="flex justify-between gap-5 mb-5">
        {/* car image & shadow */}
        <div className="relative flex justify-center items-end flex-1">
          <img
            src={carImgUrl}
            className="w-fit object-contain"
            alt="Picture of a car"
          />
          <div className="car-shadow"></div>
        </div>
        {/* car info */}
        <div className="flex flex-col gap-[16px]">
          {carInfo.map((info) => {
            return (
              <div
                className="flex items-center gap-1 text-secondary-300 text-xs"
                key={info.id}
              >
                {info.icon}
                <span>{info.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* card footer */}
      <div className="flex items-center justify-between">
        {/* price and discount */}
        <div>
          <h3 className="font-semibold text-base text-secondary-500">
            $74.00/{" "}
            <span className="font-medium text-xs text-secondary-300">day</span>
          </h3>
          <h4 className="text-xs text-secondary-300 line-through">$80.00</h4>
        </div>

        <button className="bg-primary-500 py-2 px-[20px] rounded text-xs font-medium">
          Rent now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
