import CarCard from "../../components/CarCard/CarCard";
import circlePatternUrl from "../../assets/images/Patterns/circularPattern.png";
import heroCarImageUrl from "../../assets/images/Cars/Koenigsegg-Sport.png";
import PickDrop from "../../components/PickDrop/PickDrop";
import Slider from "../../components/Slider/Slider";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <div>
        <div className="bg-[#54A6FF] w-full rounded-lg flex justify-center items-center relative min-h-[260px] md:max-h-96">
          <img
            src={circlePatternUrl}
            className="absolute left-0 bottom-0 right-0"
          />
          <div className="absolute h-full p-5 text-white flex flex-col items-start justify-between">
            {/* hero header */}
            <div className="flex flex-col w-fit gap-2">
              <h3 className="text-base font-semibold">
                The Best Platform for Car Rental
              </h3>
              <h5 className="text-xs w-4/5">
                Ease of doing a car rental safely and reliably. Of course at a
                low price.
              </h5>
            </div>
            {/* hero footer */}
            <button className="bg-primary-500 py-3 px-[20px] rounded-[4px] text-xs font-medium">
              Go to store
            </button>
            <div className="w-full px-4 flex justify-center">
              <img src={heroCarImageUrl} className="w-full" />
            </div>
          </div>
        </div>
        <div className="hidden md:block bg-[#54A6FF] w-full border rounded-lg flex justify-center items-center">
          <img src="" alt="" />
        </div>
      </div>

      {/* Content */}
      <section>
        {/* Pick - Drop */}
        <PickDrop />
        {/* Popular cars slider */}
        <div>
          <Slider title={"Popular cars"} />
        </div>
        {/* Recommended cars*/}

        <div>
          <header className="my-5">
            <h3>Recommended cars</h3>
          </header>
          {/* recommended car cards */}
          <div className="grid grid-flow-row gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5">
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
          </div>
          <footer className="flex justify-center items-center relative">
            <button className="bg-primary-500 py-2 px-[20px] rounded-[4px] text-xs">
              Show More Cars
            </button>
            <h3 className="font-bold text-secondary-300 absolute text-sm right-5">
              120 cars
            </h3>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Home;
