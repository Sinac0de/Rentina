import PicIcon from "../components/Icons/PicIcon";
import PickDrop from "../components/PickDrop/PickDrop";
import Slider from "../components/Slider/Slider";

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
          <header>Recommended cars</header>
          {/* recommended car cards */}
          <div>{}</div>
          <footer className="flex justify-center items-center relative">
            <button className="bg-primary-500 py-2 px-[20px] rounded-[4px] text-[12px]">
              Show More Cars
            </button>
            <span className="font-bold text-secondary-300 text-[14px] absolute right-5">
              120 cars
            </span>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Home;
