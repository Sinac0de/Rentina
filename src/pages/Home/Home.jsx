import PickDrop from "src/components/PickDrop/PickDrop";
import Slider from "src/components/Slider/Slider";
import AllCarsList from "src/components/AllCarsList/AllCarsList";
import Hero from "./Parts/Hero";

const Home = () => {
  return (
    <div className="px-5 md:px-14 md:pt-8">
      <Hero />
      {/* Content */}
      <div>
        {/* Pick - Drop */}
        <PickDrop />
        {/* Popular cars slider */}
        <div>
          <Slider title={"Popular cars"} />
        </div>
        {/* Recommended cars*/}
        <AllCarsList isCompact={true} hasHeader header="Recommended Cars" />
      </div>
    </div>
  );
};

export default Home;
