import CarCard from "../../components/CarCard/CarCard";
import PicIcon from "../../components/Icons/PicIcon";
import PickDrop from "../../components/PickDrop/PickDrop";
import Slider from "../../components/Slider/Slider";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <div className="p-5">
        <div className="bg-white w-full h-52 border rounded-lg flex justify-center items-center">
          <PicIcon />
        </div>
      </div>

      {/* Content */}
      <section className="p-5">
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
