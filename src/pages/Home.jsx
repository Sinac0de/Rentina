import PicIcon from "../components/Icons/PicIcon";
import PickDrop from "../components/PickDrop/PickDrop";

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
      </section>
    </>
  );
};

export default Home;
