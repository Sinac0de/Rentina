import FuelIcon from "../Icons/FuelIcon";
import TransmissionIcon from "../Icons/TransmissionIcon";
import PeopleIcon from "../Icons/PeopleIcon";
import { motion } from "framer-motion";
import GalleryIcon from "../Icons/GalleryIcon";
import HeartPlaceHolder from "../Icons/HeartPlaceHolder";

const SkeletonCard = ({ isSlideCard = false }) => {
  const carInfo = [
    {
      id: 1,
      name: "Fuel Capacity",
      icon: <FuelIcon />,
    },
    {
      id: 2,
      name: "transmission type",
      icon: <TransmissionIcon />,
    },
    {
      id: 3,
      name: "seats",
      icon: <PeopleIcon />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 bg-white rounded-lg p-3 h-full animate-pulse"
    >
      {/* card header */}
      <div className="flex justify-between">
        <div className="flex flex-col p-0">
          <div className="w-28 h-3 bg-primary-300 mb-1 rounded-full"></div>
          <div className="w-20 h-3 bg-[#EFF3FD] mb-1 rounded-full"></div>
        </div>
        {/* favorite icon */}
        <div className="h-fit mt-1 text-9xl">
          <HeartPlaceHolder isBig={isSlideCard} />
        </div>
      </div>
      {/* card body */}
      <div
        className={`flex ${
          isSlideCard ? "flex-col" : "mb-5"
        } justify-between gap-5`}
      >
        {/* car image & shadow */}
        <div
          className={`relative flex ${
            isSlideCard ? "mb-5" : ""
          } justify-center items-end p-5 flex-1`}
        >
          <GalleryIcon />
        </div>
        {/* car info */}
        <div
          className={`flex whitespace-nowrap ${
            !isSlideCard
              ? "flex-col gap-[16px] justify-center"
              : "gap-5 justify-around"
          } `}
        >
          {carInfo.map((info) => {
            return (
              <div
                className="flex items-center gap-1 text-secondary-300 text-xs"
                key={info.id}
              >
                <span className="w-16 rounded-full h-3 bg-[#EFF3FD]"></span>
              </div>
            );
          })}
        </div>
      </div>
      {/* card footer */}
      <div className="flex items-center h-full justify-between gap-5">
        {/* price and discount */}
        <div className="flex flex-col p-0">
          <div className="w-20 h-3 bg-primary-300 mb-1 rounded-full"></div>
          <div className="w-16 h-3 bg-[#EFF3FD] mb-1 rounded-full"></div>
        </div>
        <div className="bg-primary-500 w-20 h-7 rounded"></div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
