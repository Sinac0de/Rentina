import circlePatternUrl from "src/assets/images/Patterns/circularPattern.png";
import heroCarImageUrl from "src/assets/images/Cars/Koenigsegg-Sport.png";
import heroCar2ImageUrl from "src/assets/images/Cars/Nissan_GT-R.png";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="flex gap-7">
      {/* behind the hero (white background) */}
      <div className="dark:bg-slate-900 bg-white h-[15%] w-full absolute z-0 left-0 md:hidden"></div>

      <div className="bg-[#54A6FF] w-full rounded-lg flex justify-center items-center relative min-h-[260px] md:min-h-[360px] overflow-hidden">
        <img
          src={circlePatternUrl}
          className="absolute left-0 bottom-0 right-0 w-full"
        />
        <div className="dark:text-slate-200 absolute w-full h-full p-5 text-white flex flex-col items-start justify-between md:justify-normal gap-2 md:gap-6">
          {/* hero header */}
          <div className="flex flex-col md:max-w-[284px] gap-2">
            <h3 className="text-base font-semibold md:text-[32px] md:font-medium leading-10">
              The Best Platform for Car Rental
            </h3>
            <h5 className="text-xs md:text-base ">
              Ease of doing a car rental safely and reliably. Of course at a low
              price.
            </h5>
          </div>
          {/* hero footer */}
          <Link
            to="/cars"
            className="bg-primary-500 py-3 px-[20px] rounded-[4px] text-xs md:text-base font-medium z-10"
          >
            Go to store
          </Link>
          <div className="w-full px-4 flex justify-center md:absolute md:bottom-4">
            <img src={heroCarImageUrl} className="w-fit" />
          </div>
        </div>
      </div>
      <div className="hidden md:block bg-primary-500 w-full rounded-lg justify-center items-center relative">
        <div className="h-full w-full background absolute"></div>
        <div className="dark:text-slate-200 absolute w-full h-full p-5 text-white flex flex-col items-start justify-between md:justify-normal md:gap-6">
          {/* hero header */}
          <div className="flex flex-col md:max-w-[284px] gap-2">
            <h3 className="text-base font-semibold md:text-[32px] md:font-medium leading-10">
              Easy way to rent a car at a low price
            </h3>
            <h5 className="text-xs md:text-base ">
              Providing cheap car rental services and safe and comfortable
              facilities.
            </h5>
          </div>
          {/* hero footer */}
          <Link
            to="/cars"
            className="bg-[#54A6FF] py-3 px-[20px] rounded-[4px] text-xs md:text-base font-medium z-10"
          >
            Rental now
          </Link>
          <div className="w-full px-4 flex justify-center md:absolute md:bottom-4">
            <img src={heroCar2ImageUrl} className="w-fit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
