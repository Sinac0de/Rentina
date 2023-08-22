import PickDropIcon from "../Icons/PickDropIcon";

const PickDrop = () => {
  return (
    <section className="flex flex-col items-center my-5">
      {/* Pick Up */}
      <div className="w-full h-36 bg-white rounded-lg">Pick Up</div>

      <button className="bg-primary-500 rounded-lg w-fit p-4">
        <PickDropIcon />
      </button>

      {/* Drop off*/}
      <div className="w-full h-36 bg-white rounded-lg">Drop off</div>
    </section>
  );
};

export default PickDrop;
