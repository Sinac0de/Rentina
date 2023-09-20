import HeartOutlined from "../Icons/HeartOutlined";
import FuelIcon from "../Icons/FuelIcon";
import TransmissionIcon from "../Icons/TransmissionIcon";
import PeopleIcon from "../Icons/PeopleIcon";
import { useState } from "react";
import HeartFilled from "../Icons/HeartFilled";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CarCard = ({ isSlideCard = false, carData }) => {
  if (carData) {
    const {
      id,
      make,
      model,
      rental_price,
      discount_percent,
      thumbnail_img,
      specs,
    } = carData;

    const carInfo = [
      {
        id: 1,
        name: "Fuel Capacity",
        desc: `${specs.fuel_capacity} gal.`,
        icon: <FuelIcon />,
      },
      {
        id: 2,
        name: "transmission type",
        desc: specs.transmission,
        icon: <TransmissionIcon />,
      },
      {
        id: 3,
        name: "seats",
        desc: `${specs.seats} People`,
        icon: <PeopleIcon />,
      },
    ];

    const [isFavorite, setIsFavorite] = useState(false);

    // to add item to the favorites
    const handleFavorite = () => {
      setIsFavorite((prev) => !prev);
    };

    // Calculate the total price
    const totalDiscount = (rental_price * discount_percent) / 100;
    const totalPrice = rental_price - totalDiscount;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-5 bg-white rounded-lg p-3"
      >
        {/* card header */}
        <div className="flex justify-between">
          <Link className="flex flex-col p-0" to={`/shop/${id}`}>
            <h3 className="text-base font-semibold text-secondary-500 mb-1">
              {`${make} ${model}`}
            </h3>
            <h5 className="text-xs font-medium text-secondary-300">
              {specs.type}
            </h5>
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
          to={`/shop/${id}`}
          className={`flex ${
            isSlideCard ? "flex-col" : "mb-5"
          } justify-between gap-5`}
        >
          {/* car image & shadow */}
          <div
            className={`relative flex ${
              isSlideCard ? "mb-5" : ""
            } justify-center items-end flex-1`}
          >
            <img
              src={thumbnail_img}
              className="object-contain"
              alt="Picture of a car"
            />
            <div className="car-shadow"></div>
          </div>
          {/* car info */}
          <div
            className={`flex whitespace-nowrap ${
              !isSlideCard ? "flex-col gap-[16px]" : "gap-5 justify-around"
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
            <h3 className="font-semibold text-base text-secondary-500 md:text-xl">
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
            to="/payment/1"
            className="text-white bg-primary-500 py-2 px-[20px] rounded text-xs font-medium"
          >
            Rent now
          </Link>
        </div>
      </motion.div>
    );
  }
};

export default CarCard;
