import HeartOutlined from "../../assets/Icons/HeartOutlined";
import FuelIcon from "../../assets/Icons/FuelIcon";
import TransmissionIcon from "../../assets/Icons/TransmissionIcon";
import PeopleIcon from "../../assets/Icons/PeopleIcon";
import { useState } from "react";
import HeartFilled from "../../assets/Icons/HeartFilled";
import { motion } from "framer-motion";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { calTotalPrice } from "src/utils/usefulFunctions";

const CarCard = ({ isSlideCard = false, carData }) => {
  const location = useLocation();
  const filterParams = location.search;
  const [isFavorite, setIsFavorite] = useState(false);

  if (carData) {
    const { _id: id, make, model, thumbnail_img, specs } = carData;

    const {
      rental_price,
      discount_percent,
      type,
      fuel_capacity,
      transmission,
      seats,
    } = specs;

    const carInfo = [
      {
        id: 1,
        name: "Fuel Capacity",
        desc: `${fuel_capacity} gal.`,
        icon: <FuelIcon />,
      },
      {
        id: 2,
        name: "transmission type",
        desc: transmission,
        icon: <TransmissionIcon />,
      },
      {
        id: 3,
        name: "seats",
        desc: `${seats} seats`,
        icon: <PeopleIcon />,
      },
    ];

    // to add item to the favorites
    const handleFavorite = () => {
      setIsFavorite((prev) => !prev);
    };

    // Calculate the total price
    const totalPrice = calTotalPrice(rental_price, discount_percent);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="dark:bg-slate-600 flex flex-col gap-5 bg-white rounded-lg p-3 h-full"
      >
        {/* card header */}
        <div className="flex justify-between">
          <Link
            className="flex flex-col p-0"
            to={filterParams ? `/shop/${id}${filterParams}` : `/shop/${id}`}
          >
            <h3 className="dark:text-slate-300 text-base font-semibold text-secondary-500 mb-1">
              {`${make} ${model}`}
            </h3>
            <h5 className="text-xs font-medium text-secondary-300">{type}</h5>
          </Link>
          {/* favorite icon */}
          <button className="h-fit mt-1 text-9xl" onClick={handleFavorite}>
            {isFavorite ? (
              <HeartFilled isBig={isSlideCard} />
            ) : (
              <HeartOutlined isBig={isSlideCard} />
            )}
          </button>
        </div>
        {/* card body */}
        <Link
          to={filterParams ? `/shop/${id}${filterParams}` : `/shop/${id}`}
          className={`flex ${
            isSlideCard ? "flex-col" : "mb-5"
          } justify-between gap-5`}
        >
          {/* car image & shadow */}
          <div
            className={`relative flex ${
              isSlideCard ? "mb-5 min-h-[100px]" : ""
            } justify-center items-end flex-1`}
          >
            <img
              src={thumbnail_img}
              className="object-contain"
              alt={`${make} ${model}`}
              loading="lazy"
            />
            <div className="dark:from-slate-600 dark:to-slate-600/20 w-full h-1/3 bg-gradient-to-t from-white to-black/0 absolute bottom-0"></div>
          </div>
          {/* car info */}
          <div
            className={`flex whitespace-nowrap ${
              !isSlideCard
                ? "flex-col gap-[16px]"
                : "gap-5 justify-around flex-wrap"
            } `}
          >
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
        </Link>
        {/* card footer */}
        <div className="flex items-center h-full justify-between">
          {/* price and discount */}
          <div>
            <h3 className="dark:text-slate-300 font-semibold text-base text-secondary-500 md:text-xl">
              ${totalPrice.toFixed(2)}/
              <span className="font-medium text-xs text-secondary-300 md:text-base">
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
            to={
              filterParams ? `/payment/${id}${filterParams}` : `/payment/${id}`
            }
            className="dark:text-secondary-200 text-white bg-primary-500 py-2 px-[20px] rounded text-xs font-medium"
          >
            Rent now
          </Link>
        </div>
      </motion.div>
    );
  }
};

export default CarCard;
