import PickDropIcon from "../Icons/PickDropIcon";

const PickDrop = () => {
  return (
    <section className="flex flex-col items-center my-5">
      {/* Pick Up */}
      <div className="w-full h-36 bg-white rounded-lg -z-10">Pick Up</div>

      <button className="bg-primary-500 rounded-lg w-fit p-4 absolute">
        <PickDropIcon />
        <div className="bg-primary-500/40 w-full h-full rounded-lg p-4 absolute z-[-1] right-0 bottom-0 blur-md"></div>
      </button>

      {/* Drop off*/}
      <div className="w-full h-36 bg-white rounded-lg -z-10">Drop off</div>
    </section>
  );
};

export default PickDrop;
